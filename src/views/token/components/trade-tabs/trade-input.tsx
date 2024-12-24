import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BigNumber } from 'bignumber.js'
import { useDebounceEffect } from 'ahooks'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { useTradeTabsContext } from '@/contexts/trade-tabs'
import { useTokenContext } from '@/contexts/token'
import { cn } from '@/lib/utils'
import { fmt } from '@/utils/fmt'
import { Skeleton } from '@/components/ui/skeleton'
import { CustomSuspense } from '@/components/custom-suspense'
import { Img } from '@/components/img'
import { utilLang } from '@/utils/lang'
import { useTradeAmount } from '../../hooks/use-trade-amount'
import { staticUrl } from '@/config/url'
import { formatSol } from '@/packages/react-sol'
import { useRaydiumPool } from '@/hooks/raydium/use-raydium-pool'

interface Props {
  value: string
  onChange?: (value: string) => void
  disabled?: boolean
}
interface TradeCalcParams {
  amount: string | number // 输入金额
  isBuy: boolean // 是否为买入操作
  slippage?: number // 滑点百分比，例如 1 表示 1%
  feeRate?: number // 手续费率，例如 0.003 表示 0.3%
  basePrice: number // 基础价格
}
export function calculateTradeAmount({
  amount,
  isBuy,
  basePrice,
  slippage = 1, // 默认滑点 1%
  feeRate = 0.003, // 默认手续费率 0.3%
}: TradeCalcParams) {
  const bn = new BigNumber(amount)

  // 手续费计算
  const fee = bn.multipliedBy(feeRate)

  // 基础兑换金额计算
  let outputAmount: BigNumber

  if (isBuy) {
    // 买入 WIF：输入 SOL，输出 WIF
    // 1 SOL = 1/0.6147 WIF ≈ 1.627 WIF
    outputAmount = bn.dividedBy(basePrice)
  } else {
    // 卖出 WIF：输入 WIF，输出 SOL
    // 1 WIF = 0.6147 SOL
    outputAmount = bn.multipliedBy(basePrice)
  }

  // 考虑手续费
  outputAmount = outputAmount.minus(outputAmount.multipliedBy(feeRate))

  // 考虑滑点
  const minOutputAmount = outputAmount.minus(
    outputAmount.multipliedBy(slippage).dividedBy(100)
  )

  return {
    inputAmount: bn.toString(),
    outputAmount: outputAmount.toString(),
    minOutputAmount: minOutputAmount.toString(),
    fee: fee.toString(),
    priceImpact: slippage,
  }
}

export const TradeInput = ({ value, onChange, disabled }: Props) => {
  const { t } = useTranslation()
  const {
    tokenInfo,
    reserveSymbol,
    isLoadingTokenInfo,
    isGraduated,
    tokenAddr,
    tokenMetadata,
    tokenChain,
    totalSupply,
    tradePrice,
    graduatedPool,
  } = useTokenContext()
  const { isBuy, isTraded, reserveBalance, tokenBalance } =
    useTradeTabsContext()
  const [rightValue, setRightValue] = useState('0')
  const { getTokenAmount, getReserveAmount, getLastAmount } = useTradeAmount()

  const { poolInfo } = useRaydiumPool(graduatedPool)

  const tokenSymbol = tokenInfo?.symbol || tokenMetadata?.symbol

  const balance = isBuy ? reserveBalance : formatSol(tokenBalance)
  const balanceSymbol = isBuy ? reserveSymbol : tokenSymbol
  const balanceLabel = `${fmt.decimals(balance)} ${balanceSymbol}`

  const usdtPrice = BigNumber(isBuy ? value : rightValue).multipliedBy(
    tradePrice?.price || 0
  )
  const usdtLabel = `($${
    usdtPrice.isNaN() || usdtPrice.lte(0) ? 0 : fmt.decimals(usdtPrice)
  })`
  const leftValue = fmt.decimals(value || 0, { fixed: 4 })
  const leftLabel = `${leftValue} ${isBuy ? reserveSymbol : tokenSymbol}`

  const getRightLabel = () => {
    let amount = rightValue
    if (isGraduated && poolInfo) {
      amount = calculateTradeAmount({
        amount: value || 0,
        isBuy: isBuy,
        basePrice: poolInfo.currentPrice,
      }).outputAmount
    }
    const formattedAmount = fmt.decimals(amount, { fixed: 4 })
    const symbol = isBuy ? tokenSymbol : reserveSymbol
    return `${formattedAmount} ${symbol}`
  }

  const rightLabel = getRightLabel()

  const checkLastOrder = async () => {
    if (isGraduated) return true
    const [, amountLeft] = await getLastAmount()

    if (BigNumber(value).gt(amountLeft)) {
      toast.warning(
        utilLang.replace(t('trade.limit'), [
          `${amountLeft} ${reserveSymbol}`,
          t('trade.buy'),
        ])
      )
      onChange?.(amountLeft)
      return false
    }
    return true
  }

  const calcInputAmount = async () => {
    let amount = '0'

    if (!tokenAddr || !value) return setRightValue('0')
    if (BigNumber(value).lte(0)) return
    if (isBuy) {
      if (!(await checkLastOrder())) return
      const [_, tokenAmount] = await getTokenAmount(value)
      amount = tokenAmount
    } else {
      const [, reserveAmount] = await getReserveAmount(value)
      amount = reserveAmount
    }

    setRightValue(amount)
  }

  useDebounceEffect(
    () => {
      calcInputAmount()
    },
    [value, isBuy, isTraded],
    { wait: 500 }
  )

  return (
    <>
      <Input
        placeholder="0"
        className="flex-1"
        inputClass="pr-1"
        type="number"
        value={value}
        onChange={({ target }) => {
          if (BigNumber(target.value).gt(totalSupply)) return
          if (BigNumber(target.value).lt(0)) return
          onChange?.(target.value)
        }}
        disabled={disabled}
        endIcon={
          <CustomSuspense
            className={cn(
              'flex items-center shrink-0 pr-2',
              disabled && 'opacity-50'
            )}
            isPending={isLoadingTokenInfo}
            fallback={
              <>
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-6 h-6 ml-1" />
              </>
            }
          >
            <span className="mr-2 text-zinc-600">
              {isBuy ? reserveSymbol : fmt.ellipsis(tokenSymbol)}
            </span>
            <Img
              src={
                isBuy ? `${staticUrl}${tokenChain?.logo_url}` : tokenInfo?.image
              }
              width={20}
              height={20}
              className="object-contain rounded"
            />
          </CustomSuspense>
        }
      />
      <CustomSuspense
        isPending={isLoadingTokenInfo}
        fallback={
          <>
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-24 h-4" />
          </>
        }
        className="text-zinc-500 text-xs flex flex-col space-y-1 mt-1"
      >
        <span>
          {leftLabel} {isBuy && usdtLabel} ≈ {rightLabel} {!isBuy && usdtLabel}
        </span>
        <span className="mt-1">
          {t('balance')}: {balanceLabel}
        </span>
      </CustomSuspense>
    </>
  )
}

export default TradeInput
