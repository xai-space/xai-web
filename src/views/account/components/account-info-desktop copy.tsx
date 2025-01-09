import { IoMdMore } from 'react-icons/io'
import {
  EnvelopeClosedIcon,
  HeartFilledIcon,
  MinusIcon,
  PlusIcon,
} from '@radix-ui/react-icons'
import { IoCopyOutline, IoSettingsOutline } from 'react-icons/io5'
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
  useWalletOptions,
} from '@dynamic-labs/sdk-react-core'

import { useUserStore } from '@/stores/use-user-store'
import { UserCategory } from '@/api/user/types'

export const AccountInfoDesktop = (props: AccountInfoProps) => {
  const { query } = useRouter()
  const {
    isOtherUser,
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
  const { user, primaryWallet } = useDynamicContext()
  const userWallets = useWalletOptions()

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
    <div className="w-full flex justify-between items-start">
      <div className=" space-x-4">
        <AccountAvatar
          isOtherUser={isOtherUser}
          update={update}
          refetchUserInfo={refetchUserInfo}
        />
        <div>
          <div className="flex space-x-2 items-center">
            <p className="font-bold text-2xl">
              {isAgent ? agentInfo?.name : otherUserInfo?.name}
            </p>
          </div>
          <FollowDesktop />

          <div className="flex space-x-4 items-center">
            <HoverCardPop content={t('account.total-likes')}>
              <span className="inline-flex items-center text-red-500">
                <HeartFilledIcon className="mr-1 w-4 h-4" />
                {/* {userInfo?.like_count || 0} */}0
              </span>
            </HoverCardPop>

            <HoverCardPop content={t('account.total-mentions')}>
              <span className="inline-flex items-center ml-1 text-white">
                <EnvelopeClosedIcon className="mr-1 w-4 h-4" />
                {/* {userInfo?.mention_count || 0} */}0
              </span>
            </HoverCardPop>

            <HoverCardPop
              content={t('reward.desc3')}
              variant="start"
              className="w-40"
            >
              <span
                onClick={() => {
                  if (isOtherUser) return
                  router.push(Routes.Reward)
                }}
                className={cn(
                  'flex items-center space-x-2',
                  !isOtherUser &&
                    'hover:underline-offset-1 hover:underline outline-black cursor-pointer'
                )}
              >
                <DiamondIcon size={17} />
                <span className="font-bold">
                  0{/* {fmt.decimals(userInfo?.reward_amount) || 0} */}
                </span>
                <span
                  className="max-sm:hidden text-sm text-blue-600 cursor-pointer hover:underline ml-2"
                  onClick={() => router.push(Routes.Reward)}
                >
                  ({t('reward.rule')})
                </span>
              </span>
            </HoverCardPop>
          </div>
        </div>
      </div>
      <div className="flex space-x-6 items-center">
        {isOtherUser ? (
          <Button
            variant={'purple'}
            shadow={'none'}
            className="flex items-center space-x-2"
            disabled={isFollowing || isUnfollowing}
            onClick={() => followFetch()}
          >
            {otherUserInfo?.is_followed ? <MinusIcon /> : <PlusIcon />}
            <span className="text-sm">
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

        <Popover>
          <PopoverTrigger>
            <IoMdMore size={25} className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent
            side="left"
            sideOffset={10}
            align="start"
            className="flex items-center gap-2 mt-10 w-52 rounded-md shadow-md shadow-border-blue/40 bg-secondary text-white p-2 cursor-pointer hover:opacity-75 text-sm border border-secondary"
            onClick={() => copy(primaryWallet?.address ?? '')}
          >
            <IoCopyOutline size={17} />
            <p>{t('copy.wallet.address')}</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default AccountInfoDesktop
