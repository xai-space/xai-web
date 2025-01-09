import { useEffect } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { Address, parseEther, parseEventLogs } from 'viem'
import { BigNumber } from 'bignumber.js'

import { CONTRACT_ERR } from '@/errors/contract'
import { getDeadline, subSlippage } from '@/utils/contract'
import { useInvite } from '@/hooks/use-invite'
// import { bcAbiMap } from '@/contract/abi/bonding-curve'
import { useTokenContext } from '@/contexts/token'
import { useWaitForTx } from '@/hooks/use-wait-for-tx'
import { useTradeAmount } from '../use-trade-amount'
import { bcAbiMap } from '@/contract/abi/bonding-curve'
// import { masterAbiLatest } from '@/contract/abi/master'

export const useEvmTrade = (onSuccess?: () => void) => {
  const {
    tokenInfo: { } = {},
    tokenAddr,
    chainId,
    setFallbackGraduated,
  } = useTokenContext()
  const { address } = useAccount()
  const { getReferrals } = useInvite()
  const { getTokenAmount, getReserveAmount } = useTradeAmount()
  const bcConfig = {
    abi: bcAbiMap['0.1.0'],
    // address: bond_address as Address,
    address: '0x0082D35FC544C056F00C5141Aecbf830e7b60db4' as Address,
    chainId,
  }

  const {
    data: hash,
    isPending: isSubmitting,
    writeContract,
    reset: resetTrade,
  } = useWriteContract({
    mutation: {
      onError: ({ message }) => {
        CONTRACT_ERR.message(message)
        resetTrade()
      },
    },
  })

  // This `useWaitForTx` only track status.
  const { data: { logs } = {}, isFetched: isTraded } = useWaitForTx({
    hash,
    onSuccess,
    onFinally: resetTrade,
  })

  const checkForWrite = async (amount: string) => {
    if (BigNumber(amount).lte(0)) {
      CONTRACT_ERR.balanceInvalid()
      return false
    }
    return true
  }

  const buy = async ({
    reserveAmount,
    slippage,
  }: {
    reserveAmount: string
    slippage: string
  }) => {
    const [, tokenAmount] = await getTokenAmount(reserveAmount)
    if (!(await checkForWrite(tokenAmount))) return

    const reserveValue = parseEther(reserveAmount)
    const [parent, gParent] = await getReferrals()

    writeContract({
      ...bcConfig,
      functionName: 'mint',
      args: [
        tokenAddr as Address,
        reserveValue,
        BigInt(subSlippage(tokenAmount, slippage)),
        address!,
        await getDeadline(),
        [parent as Address, gParent as Address],
      ],
      value: reserveValue,
    })
  }

  const sell = async ({
    tokenAmount,
    slippage,
  }: {
    tokenAmount: string
    slippage: string
  }) => {
    const [, reserveAmount] = await getReserveAmount(tokenAmount)
    if (!(await checkForWrite(reserveAmount))) return

    const [parent, gParent] = await getReferrals()

    writeContract({
      ...bcConfig,
      functionName: 'burn',
      args: [
        tokenAddr as Address,
        parseEther(tokenAmount),
        BigInt(subSlippage(reserveAmount, slippage)),
        address!,
        await getDeadline(),
        [parent as Address, gParent as Address],
      ],
    })
  }

  useEffect(() => {
    if (!logs) return

    const [result] = parseEventLogs({
      // abi: masterAbiLatest,
      abi: [],
      eventName: 'XAIAddLiquidity',
      logs,
    })
    if (!result) return

    setFallbackGraduated(result.args.pair)
  }, [logs])

  return {
    hash,
    isSubmitting,
    // TODO/middle: Maybe we don't need it?
    isTraded,
    buy,
    sell,
    resetTrade: () => { },
  }
}
