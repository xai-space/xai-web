import { useEffect, useState } from 'react'

import { userApi } from '@/api/user'
import { useUserStore } from '@/stores/use-user-store'
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useRouter } from 'next/router'
import { UserCategory } from '@/api/user/types'
import { aiApi } from '@/api/ai'

interface RefetchUserInfoProps {
  userId: string
  isOther: boolean
}

export const useUserInfo = () => {
  const { userInfo, otherUserInfo, agentInfo, setUserInfo, setOtherUserInfo, setAgentInfo } = useUserStore()
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()
  const { user } = useDynamicContext()


  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false)
  const [isFetchingAgentInfo, setIsFetchingAgentInfo] = useState(false)

  const refetchUserInfo = async ({
    userId,
    isOther,
  }: RefetchUserInfoProps) => {
    setIsFetchingUserInfo(true)
    try {
      const { data } = await userApi.getInfo(userId)
      if (isOther) {
        setOtherUserInfo(data)
      } else {
        setUserInfo(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsFetchingUserInfo(false)
    }
  }

  const refetchAgentInfo = async (agentId: string) => {
    setIsFetchingAgentInfo(true)
    try {
      const { data } = await aiApi.getAgentInfo(agentId)
      setAgentInfo(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsFetchingAgentInfo(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn && !isFetchingUserInfo && !userInfo?.user_id && user?.userId) {
      refetchUserInfo({ userId: user.userId, isOther: false })
      return
    }

    if (!isLoggedIn && userInfo?.user_id) {
      setUserInfo(null)
    }
  }, [isLoggedIn, user])


  useEffect(() => {
    const uid = router.query.uid
    const type = router.query.t
    if (!uid) return
    if (type === UserCategory.Agent) {
      refetchAgentInfo(uid as string)
    } else {
      refetchUserInfo({
        userId: uid as string,
        isOther: true,
      })
    }
  }, [router.query.uid])

  return {
    userInfo: userInfo,
    otherUserInfo,
    isFetchingUserInfo,
    agentInfo,
    isFetchingAgentInfo,
    refetchUserInfo,
    refetchAgentInfo,
    setAgentInfo,
    setOtherUserInfo,
    setUserInfo,
  }
}
