import { useMutation } from '@tanstack/react-query'

import { tokenApi } from '@/api/token'
import { DeployFormParams } from './use-deploy'
import { reportException } from '@/errors'
import { useTokenConfig } from '@/hooks/use-token-config'
import { Network } from '@/enums/contract'

export const useCreateToken = (chainName: string) => {
  const { bcAddress } = useTokenConfig(chainName)

  const {
    data: createData,
    error: createTokenError,
    isPending: isCreatingToken,
    mutateAsync: create,
  } = useMutation({
    mutationKey: [tokenApi.createToken.name],
    mutationFn: tokenApi.createToken,
  })
  const createTokenData = createData?.data

  const createToken = async (params: DeployFormParams) => {
    // if (!bcAddress) return

    params.network = Network.Evm

    console.log('createToken', params)
    try {
      const { data } = await create({
        ...params,
        // factory_address: bcAddress,
      })
      return data.id
    } catch (e) {
      reportException(e)
    }
  }

  return {
    createTokenData,
    createTokenError,
    isCreatingToken,
    createToken,
  }
}
