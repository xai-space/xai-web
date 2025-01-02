import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FollowersCards } from './followers-cards'
import { FollowingCards } from './following-cards'
import { UserListType } from '@/api/user/types'
import { useAccountContext } from '@/contexts/account'
import { useRef } from 'react'
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useUserStore } from '@/stores/use-user-store'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { UserInfo } from '@/api/feed/types'

export const FollowDesktop = (info: any) => {
  const { push, query } = useRouter()
  const { t } = useTranslation()
  const [tab, setTab] = useState(UserListType.Following)
  const { isOtherUser, isAgent, followers, followingResults, refetchFollow } =
    useAccountContext()
  const { userInfo, otherUserInfo } = useUserStore()
  // const {
  //   agent,
  //   user,
  //   // followers,
  //   // isLoading: isLoadingFollowers,
  //   // isFetching: isFetchingFollowers,
  // } = followersResults

  const {
    following,
    isLoading: isLoadingFollowing,
    isFetching: isFetchingFollowing,
  } = followingResults
  const closeRef = useRef<HTMLButtonElement>(null)
  const isFollowers = tab === UserListType.Followers

  return (
    <Dialog>
      <div
        className="flex items-center justify-start"
        style={{ margin: '0 10px 10px 0px' }}
      >
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            shadow="none"
            onClick={() =>
              push(
                `${Routes.FollowList}?isAgent=${isAgent}&user_id=${query.uid}`
              )
            }
            className="shadow-none pl-0 !border-none group relative"
          >
            <span className="space-x-1 text-base relative">
              <span className="font-bold text-[#0f1419]">
                {otherUserInfo?.follow_count ?? 0}
              </span>
              <span className="text-[#536471] text-[14px] hover:underline">
                {t('following')}
              </span>
            </span>
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              push(
                `${Routes.FollowList}?isAgent=${isAgent}&user_id=${query.uid}`
              )
            }
            shadow="none"
            className="shadow-none !border-none group ml-2 relative"
          >
            <span className="space-x-1 text-base relative">
              <span className="font-bold text-[#0f1419]">
                {otherUserInfo?.follower_count ?? 0}
              </span>
              <span className="text-[#536471] text-[14px] hover:underline">
                {t('followers')}
              </span>
            </span>
          </Button>
        </DialogTrigger>
      </div>
    </Dialog>
  )
}

export default FollowDesktop
