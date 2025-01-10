import { IoSettingsOutline } from 'react-icons/io5'
import AccountAvatar from './account-avatar'
import FollowDesktop from '@/views/account/components/follow-desktop'
import { AccountInfoProps } from './profile'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import ProfileForm from '@/views/account/components/profile-form'

import { CiCircleMore } from 'react-icons/ci'
import { userApi } from '@/api/user'
import { UserCategory } from '@/api/user/types'
import { useWallet } from '@/hooks/use-wallet'
import { useUserInfo } from '@/hooks/use-user-info'
import { useAccountContext } from '@/contexts/account'

export const AccountInfoDesktop = (props: AccountInfoProps) => {
  const { isOtherUser, update, isAgent } = props
  const { t } = useTranslation()
  const { userInfo } = useAccountContext()

  const { isConnected, showConnectModal } = useWallet()

  const {
    otherUserInfo,
    setOtherUserInfo,
    agentInfo,
    setAgentInfo,
    refetchAgentInfo,
    refetchUserInfo,
  } = useUserInfo()

  const followFetch = async () => {
    if (!isConnected) {
      showConnectModal()
      return
    }

    if (isAgent) {
      const status = !agentInfo?.is_followed
      setAgentInfo({ ...agentInfo!, is_followed: status })
      await userApi.postFollow({
        category: UserCategory.Agent,
        target_id: agentInfo?.agent_id!,
        status: Number(status),
      })
      refetchAgentInfo(agentInfo?.agent_id!)
    } else {
      const status = !otherUserInfo?.is_followed
      setOtherUserInfo({ ...otherUserInfo, is_followed: status })
      await userApi.postFollow({
        category: UserCategory.User,
        target_id: otherUserInfo?.user_id!,
        status: Number(status),
      })
      refetchUserInfo({ userId: otherUserInfo?.user_id!, isOther: true })
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <AccountAvatar
            isOtherUser={isOtherUser}
            update={update}
            isAgent={isAgent}
          />
        </div>

        <div className="flex items-center h-10">
          <CiCircleMore size={42} className="mr-[5px]"></CiCircleMore>
          {isOtherUser ? (
            <div onClick={followFetch}>
              {(
                isAgent ? agentInfo?.is_followed : otherUserInfo?.is_followed
              ) ? (
                <div
                  className="rounded-full px-4 py-1 text-[14px] text-center font-medium border-[1px] 
                 border-[#CFD9DE] bg-white text-black
                hover:bg-red-50 hover:text-red-600 hover:border-red-200
                group cursor-pointer"
                >
                  <span className="group-hover:hidden">Following</span>
                  <span className="hidden group-hover:inline">Unfollow</span>
                </div>
              ) : (
                <div className="rounded-full text-center px-4 py-1 text-[14px] bg-black text-white font-medium border-[#000] border-[1px] hover:bg-gray-800 cursor-pointer">
                  Follow
                </div>
              )}
            </div>
          ) : (
            <ProfileForm>
              <Button
                variant={'purple'}
                className="flex items-center space-x-2"
              >
                <IoSettingsOutline size={18} />
                <span className="text-sm">{t('edit')}</span>
              </Button>
            </ProfileForm>
          )}
        </div>
      </div>

      <div>
        <p className="font-bold text-[20px] mt-4 text-[0f1419]">
          {isAgent ? agentInfo?.name : otherUserInfo?.name}
        </p>
      </div>
      <p className="text-[#0f1419] text-[15px] mt-[4px]">
        {userInfo?.description ? userInfo?.description : ''}
      </p>
      <FollowDesktop info={isAgent ? agentInfo : otherUserInfo} />
    </div>
  )
}

export default AccountInfoDesktop
