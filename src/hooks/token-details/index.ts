import { useEvmTokenDetails } from './use-evm-token-details'
import { useSolTokenDetails } from './use-sol-token-details'
import { Network } from '@/enums/contract'

type TokenDetailsMap = {
  [Network.Evm]: typeof useEvmTokenDetails
  [Network.Svm]: typeof useSolTokenDetails
}

type TokenDetailsParams = {
  [k in keyof TokenDetailsMap]: Parameters<TokenDetailsMap[k]>
}

type TokenDetailsReturn = {
  [k in keyof TokenDetailsMap]: ReturnType<TokenDetailsMap[k]>
}

export const useTokenDetails = <T extends keyof TokenDetailsMap>(
  type: T,
  ...params: TokenDetailsParams[T]
) => {
  if (type === Network.Svm) {

    return useSolTokenDetails(
      ...(params as TokenDetailsParams[Network.Svm])
    ) as TokenDetailsReturn[Network.Svm]
  }

  if (type === Network.Evm) {
    return useEvmTokenDetails(
      ...(params as TokenDetailsParams[Network.Evm])
    ) as TokenDetailsReturn[Network.Evm]

  }
  // TODO/mul: more chains...

  const getTokenFC = () => {
    if (type === Network.Svm)
      return useSolTokenDetails(
        ...(params as TokenDetailsParams[Network.Svm])
      ) as TokenDetailsReturn[Network.Svm]

    //   if (type === Network.Evm)
    return useEvmTokenDetails(
      ...(params as TokenDetailsParams[Network.Evm])
    ) as TokenDetailsReturn[Network.Evm]
  }

  const {
    tokenMetadata,
    isGraduated,
    isLoadingDetails,
    progress,
    tokenLeftAmount,
    totalSupply,
    reserveTotalAmount,
    refetchDetails,
  } = getTokenFC()

  return {
    tokenMetadata,
    isGraduated,
    isLoadingDetails,
    progress,
    tokenLeftAmount,
    totalSupply,
    reserveTotalAmount,
    refetchDetails,
  }
}
