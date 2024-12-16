import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDisconnect } from 'wagmi'

import { userApi } from '@/api/user'
import { useUserStore } from '@/stores/use-user-store'
import { dynamicToken } from '@/config/localstorage'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useRouter } from 'next/router'
// import { useSignLogin } from './use-sign-login'

export const useUserInfo = (addr?: string) => {
  const { userInfo, setUserInfo } = useUserStore()
  const router = useRouter()
  const token = typeof window !== 'undefined' ? localStorage.getItem(dynamicToken) : ''

  const isLoggedIn = useIsLoggedIn()

  const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false)
  // Query other user info.
  // const {
  //   data: otherUserInfo,
  //   isFetching: isFetchingOtherUserInfo,
  //   refetch: refetchOtherUserInfo,
  // } = useQuery({
  //   enabled: false,
  //   queryKey: [userApi.getOtherInfo.name, addr],
  //   queryFn: () => userApi.getOtherInfo(addr!),
  //   // enabled: !!addr,
  // })


  const refetchUserInfo = () => {
    setIsFetchingUserInfo(true)
    userApi.getInfo().then((res) => {
      setUserInfo(res.data)
    }).finally(() => {
      setIsFetchingUserInfo(false)
    })
  }

  // // Query my info.
  // const {
  //   data: userInfo,
  //   isFetching: isFetchingUserInfo,
  //   refetch: refetchUserInfo,
  // } = useQuery({
  //   enabled: false,
  //   queryKey: [userApi.getInfo.name],
  //   queryFn: () => userApi.getInfo(),
  // })

  // Update latest user info if it's not null.
  // useEffect(() => {
  //   if (!userInfo?.data) return
  //   setUserInfo(userInfo.data)
  // }, [userInfo])

  // logout if has not token.
  useEffect(() => {
    if (!!token) return
    // logout()
    // disconnect()
  }, [token])


  useEffect(() => {
    if (isLoggedIn) {
      refetchUserInfo()
    } else {
      if (userInfo?.user?.id) {
        setUserInfo(null)
        router.push('/')
      }
    }
  }, [isLoggedIn])

  return {
    userInfo: userInfo,
    // otherUserInfo: otherUserInfo?.data,
    isFetchingUserInfo,
    // isFetchingOtherUserInfo,
    refetchUserInfo,
    // refetchOtherUserInfo,
  }
}
