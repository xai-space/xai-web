import { IoMdMore } from 'react-icons/io'
import {
  EnvelopeClosedIcon,
  HeartFilledIcon,
  MinusIcon,
  PlusIcon,
} from '@radix-ui/react-icons'
import { IoClose, IoCopyOutline, IoSettingsOutline } from 'react-icons/io5'
import AccountAvatar from './account-avatar'
import FollowDesktop from '@/views/account/components/follow-desktop'
import { AccountInfoProps, HoverCardPop } from './profile'
import { useTranslation } from 'react-i18next'
import router, { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { cn } from '@/lib/utils'
import DiamondIcon from '@/components/diamond-icon'
import { Button } from '@/components/ui/button'
import ProfileForm from '@/views/account/components/profile-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { useClipboard } from '@/hooks/use-clipboard'
import { userApi } from '@/api/user'
import {
  useDynamicContext,
  useUserWallets,
  useWalletItemActions,
  useWalletOptions,
} from '@dynamic-labs/sdk-react-core'
import { use, useEffect, useState } from 'react'

import { useUserStore } from '@/stores/use-user-store'
import { UserCategory, UserInfoRes } from '@/api/user/types'
import { CiCircleMore } from "react-icons/ci";



export const AccountInfoDesktop = (props: AccountInfoProps) => {
  const { query } = useRouter()
  const {
    isOtherUser,
    userInfo,
    isFollowing,
    isUnfollowing,
    tokenAddr,
    update,
    follow,
    unfollow,
    isAgent,
    refetchUserInfo,
  } = props
  const { t } = useTranslation()
  const { copy } = useClipboard()

  const { otherUserInfo, setOtherUserInfo, agentInfo } = useUserStore()
  console.log('otherUserInfo$$;', otherUserInfo)

  const { user, primaryWallet } = useDynamicContext()
  const userWallets = useWalletOptions()

  // console.log('agentInfo', agentInfo, isAgent)

  let status: 0 | 1 = 1
  const followFetch = async () => {
    const category =
      query.t === 'agent' ? UserCategory.Agent : UserCategory.User
    if (query.t === 'agent') {
    }
    if (otherUserInfo?.is_followed) {
      status = 0
    } else {
      status = 1
    }
    const res = await userApi.postFollow({
      category: category,
      target_id: query.uid as string,
      status: status,
    })
    if (status) {
      setOtherUserInfo({ ...otherUserInfo, is_followed: true })
    } else {
      setOtherUserInfo({ ...otherUserInfo, is_followed: false })
    }
  }

  return (
    <div className="w-full">
      <div className='flex justify-between'>
        <div className="flex space-x-4">
          <AccountAvatar
            isOtherUser={isOtherUser}
            update={update}
            refetchUserInfo={refetchUserInfo}
          />
        </div>

        <div className="flex items-center h-10">
          <CiCircleMore size={42} className='mr-[5px]'></CiCircleMore>
          {isOtherUser ? (
            <Button
              shadow={'none'}
              className="flex items-center bg-[#0f1419] rounded-full"
              disabled={isFollowing || isUnfollowing}
              onClick={() => followFetch()}
            >
              <span className="text-[15px] font-semibold px-[5px]">
                {otherUserInfo?.is_followed ? t('unfollow') : t('follow')}
              </span>
            </Button>
          ) : (
            <ProfileForm>
              <Button variant={'purple'} className="flex items-center space-x-2">
                <IoSettingsOutline size={18} />
                <span className="text-sm">{t('edit')}</span>
              </Button>
            </ProfileForm>
          )}
        </div>
      </div>

      <div>
        <p className="font-bold text-[20px] text-[0f1419]">
          {isAgent ? agentInfo?.name : otherUserInfo?.name}
        </p>
      </div>
      <p className="text-[#0f1419] text-[15px] mt-[4px]">
        {userInfo?.description ? userInfo?.description : t('there.noting')}
      </p>
      <FollowDesktop />
    </div>
  )
}

export default AccountInfoDesktop
