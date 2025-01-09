import { useEffect, useMemo } from 'react'
import { Address, isAddress } from 'viem'
import { isEmpty } from 'lodash'

import { useEvmTrade } from './evm/use-evm-trade'
import { useTokenContext } from '@/contexts/token'
import { useTradeToast } from '@/hooks/use-trade-toast'
import { TradeType } from '@/enums/trade'
import { CONTRACT_ERR } from '@/errors/contract'
import { Network } from '@/enums/contract'
import { useTradeAmount } from './use-trade-amount'
import { useSvmTrade } from './svm/use-svm-trade'
import { useEvmDex } from './evm/use-evm-dex'
import { useSvmDex } from './svm/use-svm-dex'

// Used for trade success tips.
export const lastTrade = {
  type: '' as TradeType,
  tokenAmount: '',
  reserveAmount: '',
}

export const useTrade = (onSuccess?: () => void) => {
  const {
    isGraduated,
    tokenAddr,
    tokenMetadata,
    chainId,
    network,
    graduatedPool,
  } = useTokenContext()
  const { showToast } = useTradeToast()

  const { getTokenAmount, getReserveAmount } = useTradeAmount()

  const evmDex = useEvmDex(tokenAddr as Address, graduatedPool, chainId, {
    onSuccess,
  })

  const svmDex = useSvmDex(graduatedPool!, onSuccess)

  const evmTrade = useEvmTrade(onSuccess)
  const svmTrade = useSvmTrade(onSuccess, tokenAddr)

  const { dexHash, isDexSubmitting, isDexTraded, dexBuy, dexSell } = useMemo(() => {
    return {
      [Network.Evm]: evmDex,
      [Network.Svm]: svmDex,
      [Network.Tvm]: evmDex,
    }[network]
  }, [network, evmDex, svmDex])

  const {
    hash: tradeHash,
    isTraded,
    isSubmitting,
    buy,
    sell,
  } = useMemo(() => {
    return {
      [Network.Evm]: evmTrade,
      [Network.Svm]: svmTrade,
      [Network.Tvm]: evmTrade,
    }[network]
  }, [network, isGraduated, evmTrade, svmTrade])
  const hash = dexHash || tradeHash

  // TODO: add Sol, TON chains
  const updateLastTrade = async (type: TradeType, inputAmount: string) => {
    lastTrade.type = type
    if (type === TradeType.Buy) {
      const [, tokenAmount] = await getTokenAmount(inputAmount)
      lastTrade.tokenAmount = tokenAmount
      lastTrade.reserveAmount = inputAmount
    } else {
      const [, reserveAmount] = await getReserveAmount(inputAmount)
      lastTrade.tokenAmount = inputAmount
      lastTrade.reserveAmount = reserveAmount
    }
  }

  const checkForTrade = async (amount: string) => {
    if (isEmpty(amount)) {
      CONTRACT_ERR.amountInvlid()
      return false
    }
    // TODO: add Sol, Ton
    if (network === Network.Evm) {
      if (!isAddress(tokenAddr)) {
        CONTRACT_ERR.tokenInvalid()
        return false
      }
    }

    if (network === Network.Svm) {
      if (!tokenAddr) {
        CONTRACT_ERR.tokenInvalid()
        return false
      }
    }
    // TODO: add Sol, Ton
    if (!tokenMetadata) {
      CONTRACT_ERR.contractAddrNotFound()
      return false
    }

    return true
  }

  const handleBuy = async (amount: string, slippage: string) => {
    if (!(await checkForTrade(amount))) return

    await updateLastTrade(TradeType.Buy, amount)

    // DEX trade
    if (isGraduated) {
      return dexBuy(amount, slippage)
    }

    return buy({ reserveAmount: amount, slippage })
  }

  const handleSell = async (amount: string, slippage: string) => {
    if (!(await checkForTrade(amount))) return

    await updateLastTrade(TradeType.Sell, amount)

    // DEX trade
    if (isGraduated) {
      return dexSell(amount, slippage)
    }

    return sell({ tokenAmount: amount, slippage })
  }

  // show trade toast
  useEffect(() => {
    if (!hash) return

    showToast({ hash, ...lastTrade })
  }, [hash])

  return {
    hash,
    isTrading: isSubmitting || isDexSubmitting,
    isTraded: isTraded || isDexTraded,
    handleBuy,
    handleSell,
  }
}
