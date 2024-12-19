import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDisconnect } from 'wagmi'

import { userApi } from '@/api/user'
import { useUserStore } from '@/stores/use-user-store'
import { dynamicToken } from '@/config/localstorage'
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
// import { useSignLogin } from './use-sign-login'

interface RefetchUserInfoProps {
  userId: string
  isOther: boolean
}

export const useUserInfo = () => {
  const { userInfo, otherUserInfo, setUserInfo, setOtherUserInfo } = useUserStore()
  const router = useRouter()

  const isLoggedIn = useIsLoggedIn()
  const { user } = useDynamicContext()

  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false)

  const refetchUserInfo = async ({
    userId,
    isOther,
  }: RefetchUserInfoProps) => {
    setIsFetchingUserInfo(true)
    try {
      const res = await userApi.getInfo(userId)
      if (isOther) {
        setOtherUserInfo(res.data)
      } else {
        setUserInfo(res.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsFetchingUserInfo(false)
    }
  }

  useEffect(() => {
    console.log('isLoggedIn refetchUserInfo')
    if (isLoggedIn && !isFetchingUserInfo && !userInfo?.user_id && user?.userId) {
      refetchUserInfo({ userId: user.userId, isOther: false })
      return
    }

    if (!isLoggedIn && userInfo?.user_id) {
      setUserInfo(null)
      router.push('/')
    }
  }, [isLoggedIn, user])

  useEffect(() => {
    const newOtherUser = router.query.uid
    if (!newOtherUser) return

    if (router.pathname.startsWith(Routes.Account) && newOtherUser !== otherUserInfo?.user_id) {
      refetchUserInfo({
        userId: newOtherUser as string,
        isOther: true,
      })
    }

  }, [router.query.uid])

  return {
    userInfo: userInfo,
    otherUserInfo,
    // otherUserInfo: otherUserInfo?.data,
    isFetchingUserInfo,
    // isFetchingOtherUserInfo,
    refetchUserInfo,
    // refetchOtherUserInfo,
  }
}
