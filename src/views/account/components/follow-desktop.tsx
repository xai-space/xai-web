import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { useAccountContext } from '@/contexts/account'
import { useUserInfo } from '@/hooks/use-user-info'

export const FollowDesktop = () => {
  const { push, query } = useRouter()
  const { t } = useTranslation()
  const { isAgent, isOtherUser } = useAccountContext()
  const { otherUserInfo, agentInfo, userInfo } = useUserInfo()

  const followCount = () => {
    if (isAgent) {
      return agentInfo?.follow_count
    }
    if (isOtherUser) {
      return otherUserInfo?.follow_count
    }
    return userInfo?.follow_count
  }
  const followerCount = () => {
    if (isAgent) {
      return agentInfo?.follower_count
    }
    if (isOtherUser) {
      return otherUserInfo?.follower_count
    }
    return userInfo?.follower_count
  }
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
                {followCount() ?? 0}
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
                {followerCount() ?? 0}
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
