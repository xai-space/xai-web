import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useUserInfo } from '@/hooks/use-user-info'
import { AccountProvider } from '@/contexts/account'
import { useRouter } from 'next/router'
import { FollowDesktop } from '@/views/account/components/follow-desktop'
import { AccountTab } from '@/views/account/components/account-tab'
import { useUserList } from '@/views/account/hooks/use-user-list'
import { UserListType } from '@/api/user/types'
import { PrimaryLayout } from '@/components/layouts/primary'
import Profile from './components/profile'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useUserFollowingList } from './hooks/use-user-follwing-list'

export const AccountPage = () => {
  const { query } = useRouter()
  const tokenAddr = (query.address || '') as string
  const {
    userInfo,
    // otherUserInfo,
    // isFetchingOtherUserInfo,
    isFetchingUserInfo,
    refetchUserInfo,
    // refetchOtherUserInfo,
  } = useUserInfo(tokenAddr)
  const { primaryWallet } = useDynamicContext()
  // const currenUserAddr = String(userInfo?.wallet_address || '')
  const currenUserAddr = primaryWallet?.address
  const isOtherUser = tokenAddr !== currenUserAddr
  // const followersResults = useUserList(UserListType.Followers)
  // const followingResults = useUserList(UserListType.Following)

  // const refetchFollow = () => {
  //   followersResults.refetch()
  //   followingResults.refetch()
  // }

  return (
    <AccountProvider
      value={{
        userInfo: userInfo,
        isPending: isFetchingUserInfo,
        isOtherUser: isOtherUser,
        refetchUserInfo: refetchUserInfo,
        // followers: agentFollowers,
        followingResults: () => {},
        refetchFollow: () => {},
      }}
    >
      <div className="flex-1 min-h-main flex gap-2 flex-col overflow-auto max-w-[800px] mx-auto">
        <aside
          className={cn(
            'flex flex-col gap-4 sticky top-20 mb-2',
            'static gap-2'
          )}
        >
          <Profile />
          <div className="hidden mt-4">
            <FollowDesktop />
          </div>
        </aside>

        <AccountTab />
      </div>
    </AccountProvider>
  )
}

AccountPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout>
    {/* <PageFallback>{page}</PageFallback> */}
    {page}
  </PrimaryLayout>
)

export default AccountPage
