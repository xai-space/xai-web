import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'

import { tokenApi } from '@/api/token'
import { ApiCode, ApiResponse } from '@/api/types'
import { useEvmTokenDetails } from '@/hooks/token-details/use-evm-token-details'
import { TokenType } from '@/enums/token'
import { useChainInfo } from '@/hooks/use-chain-info'
import { Network } from '@/enums/contract'
import { useSolTokenDetails } from '@/hooks/token-details/use-sol-token-details'
import { useChainsStore } from '@/stores/use-chains-store'

export const useTokenInfo = (tokenAddr: string, chainName: string) => {
  const { chainsMap } = useChainsStore()

  const { chainId } = useChainInfo(chainName)
  const { network_type: currentNetWork } = chainsMap[chainName] || {}
  const [fallbackGraduated, setFallbackGraduated] = useState<Address>()

  const {
    data: tokenInfo,
    error: tokenInfoErr,
    isLoading: isLoadingTokenInfo,
    isFetching: isFetchingTokenInfo,
    isRefetching: isRefetchingTokenInfo,
    // Be careful, chart will be recreate when refetch.
    refetch: refetchInfo,
  } = useQuery({
    queryKey: [tokenApi.getDetail.name, chainName, tokenAddr],
    queryFn: () => tokenApi.getDetail({ chain: chainName, address: tokenAddr }),
    retry: (count, e?: ApiResponse) => {
      if (e?.code === ApiCode.NotFound) return false
      return count < 2
    },
    select: ({ data }) => data,
    refetchOnWindowFocus: false,
    enabled: !!chainName && !!tokenAddr,
  })
  const { coin_version, bond_version, bond_address } = tokenInfo ?? {}
  const isNotFound = tokenInfoErr?.code === ApiCode.NotFound

  const tokenDetailsFc = () => {
    // TODO/mul: change requirement...
    if (Network.Svm === currentNetWork) {
      return useSolTokenDetails(tokenAddr)
    }

    return useEvmTokenDetails(
      chainId,
      coin_version,
      tokenAddr,
      bond_version,
      bond_address
    )
  }

  const { isLoadingDetails, refetchDetails, ...tokenDetails } = tokenDetailsFc()
  const { progress, tokenLeftAmount, reserveTotalAmount } = tokenDetails
  const isGraduated = tokenDetails.isGraduated
  const graduatedPool = tokenInfo?.graduated_pool || fallbackGraduated

  // console.log('totalSupply in token-info', totalSupply)

  const refetchTokenInfo = () => {
    refetchInfo()
    refetchDetails()
  }

  return {
    tokenInfo,
    isLoadingTokenInfo: isLoadingTokenInfo || isLoadingDetails,
    isFetchingTokenInfo,
    isRefetchingTokenInfo,
    isNotFound,
    isLoadingDetails,
    refetchTokenInfo,
    refetchDetails,
    graduatedPool,
    setFallbackGraduated,

    ...tokenDetails,
    progress,
    isGraduated,
    tokenLeft: tokenLeftAmount,
    reserveTotal: reserveTotalAmount,
  }
}
