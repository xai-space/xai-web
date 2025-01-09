import { useMutation } from '@tanstack/react-query'
import { zeroAddress } from 'viem'

import { inviteApi } from '@/api/invite'
import { useTokenQuery } from '../views/token/hooks/use-token-query'
import { useUserStore } from '@/stores/use-user-store'

export const useInvite = () => {
  const { userInfo } = useUserStore()
  const { referralCode } = useTokenQuery()

  const {
    isPending: isGetting,
    mutateAsync: getInviterInfo,
    reset: resetInviterInfo,
  } = useMutation({
    mutationKey: [inviteApi.getDetail],
    mutationFn: async (code?: string) => {
      // don't check if no any code.
      if (!code && !referralCode) return Promise.resolve()

      const { data } = await inviteApi
        .getDetail(code ?? referralCode)
        .catch(() => ({ data: null }))
      return data
    },
  })

  const {
    isPending,
    mutateAsync: getIsBindInviter,
    reset: resetCanBind,
  } = useMutation({
    mutationKey: [inviteApi.getIsBound.name],
    mutationFn: async () => {
      if (!referralCode) return false
      if (userInfo?.code === referralCode) return true

      const { data } = await inviteApi
        .getIsBound({ invitationCode: referralCode })
        .catch(() => ({ data: true }))
      return data
    },
  })

  const getReferrals = async (code?: string) => {
    const { wallet_address, inviter } = (await getInviterInfo(code)) ?? {}
    const { one, two } = userInfo?.inviter ?? {}
    const parent = one || wallet_address || zeroAddress
    const gParent = two || inviter?.one || zeroAddress

    return [parent, gParent] as const
  }

  return {
    isGetting,
    isPending,
    getInviterInfo,
    resetInviterInfo,
    getIsBindInviter,
    resetCanBind,
    getReferrals,
  }
}
