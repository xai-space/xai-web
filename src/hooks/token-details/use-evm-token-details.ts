import { BigNumber } from 'bignumber.js'
import { useMemo } from 'react'
import { Address, formatEther, zeroAddress } from 'viem'
import { useReadContract } from 'wagmi'

import { BI_ZERO } from '@/constants/number'
import { bcAbiMap } from '@/contract/abi/bonding-curve'
import { tokenAbiMap } from '@/contract/abi/token'

export const useEvmTokenDetails = (
  chainId: number,
  _tokenVersion: any | undefined,
  tokenAddr: string | undefined,
  _bcVersion: any | undefined,
  _bcAddr: string | undefined
) => {
  const tokenConfig = {
    abi: tokenAbiMap['0.1.0'],
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
    abi: bcAbiMap['0.1.0'],
    // address: bcAddr as Address,
    address: '0x0082D35FC544C056F00C5141Aecbf830e7b60db4' as Address,
    // chainId,
    chainId: 97,
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
