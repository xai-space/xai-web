import { useMemo } from 'react'
import { BigNumber } from 'bignumber.js'
import { Address, formatEther, zeroAddress } from 'viem'
import { useReadContract } from 'wagmi'

import { BI_ZERO } from '@/constants/number'

export const useEvmTokenDetails = (
  chainId: number,
  tokenVersion: any | undefined,
  tokenAddr: string | undefined,
  bcVersion: any | undefined,
  bcAddr: string | undefined
) => {
  const tokenConfig = {
    abi: [],
    address: tokenAddr as Address,
    chainId,
  } as const
  const enabled = !!chainId && !!tokenAddr

  const {
    data: tokenMetadata,
    isLoading: isLoadingMetadata,
    refetch: refetchMetadata,
  } = useReadContract({
    ...tokenConfig,
    functionName: 'getMetadata',
    query: { enabled },
  })

  const { data: pools = [], refetch: refetchPools } = useReadContract({
    abi: [],
    address: bcAddr as Address,
    chainId,
    functionName: 'pools_',
    args: [tokenAddr as Address],
    query: {
      enabled: !!tokenAddr,
      refetchInterval: 10_000, // refresh each 10s.
    },
  })

  const [
    ,
    ,
    tokenLeft = BI_ZERO,
    ,
    reserveTotal = BI_ZERO,
    ,
    ,
    ,
    ,
    headmaster = zeroAddress,
    maxSupply = BI_ZERO,
  ] = pools

  const isGraduated = headmaster !== zeroAddress
  const tokenLeftAmount = formatEther(tokenLeft)
  const reserveTotalAmount = formatEther(reserveTotal)
  const tokenMaxSupply = formatEther(maxSupply)

  const progress = useMemo(() => {
    if (isGraduated) return '100'

    const percent = BigNumber(tokenMaxSupply)
      .minus(tokenLeftAmount)
      .div(tokenMaxSupply)
      .multipliedBy(100)

    return percent.lte(0) || percent.isNaN() ? '0' : percent.toFixed(2)
  }, [tokenMaxSupply, tokenLeftAmount, isGraduated])

  const refetchDetails = () => {
    refetchMetadata()
    refetchPools()
  }

  return {
    tokenMetadata,
    isLoadingDetails: isLoadingMetadata,
    totalSupply: tokenMaxSupply,
    refetchDetails,

    progress,
    isGraduated,
    tokenLeftAmount,
    reserveTotalAmount,
  }
}
