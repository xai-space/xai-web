import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useQuery } from '@tanstack/react-query'

export const useDynamicBalance = () => {
  const { primaryWallet } = useDynamicContext()

  const {
    data: primaryBalance = '0',
    isFetching: isFetchingPrimaryBalance,
    refetch: refetchPrimaryBalance,
  } = useQuery({
    queryKey: ['getDynamicBalance', primaryWallet?.address],
    queryFn: () => primaryWallet?.getBalance(),
    enabled: !!primaryWallet,
  })

  return {
    primaryBalance,
    isFetchingPrimaryBalance,
    refetchPrimaryBalance,
  }
}
