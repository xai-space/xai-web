import { useMutation } from '@tanstack/react-query'

import { tokenApi } from '@/api/token'
import { DeployFormParams } from './use-deploy'
import { reportException } from '@/errors'
import { useTokenConfig } from '@/hooks/use-token-config'
import { Network } from '@/enums/contract'
import { aiApi } from '@/api/ai'
import { CoinType } from '@/config/coin'

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

    if (params.coin_type === CoinType.NFTAgent) {
      const formData = new FormData()
      formData.append('url', params.image)
      const { data } = await aiApi.uploadImage(formData)
      params.image = data.url
    }

    params.image = `http:/${params.image}`

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
