import { type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { useUserInfo } from '@/hooks/use-user-info'
import { AccountProvider } from '@/contexts/account'
import { useRouter } from 'next/router'
import { FollowDesktop } from '@/views/account/components/follow-desktop'
import { AccountTab } from '@/views/account/components/account-tab'
import { useUserList } from '@/views/account/hooks/use-user-list'
import { UserCategory, UserListType } from '@/api/user/types'
import { PrimaryLayout } from '@/components/layouts/primary'
import Profile from './components/profile'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useUserFollowingList } from './hooks/use-user-follwing-list'
import { useUserStore } from '@/stores/use-user-store'
import { PostFeed } from '@/components/post-feed'

import { AgentUserInfo } from '../../components/agent-user-info'

export const AccountPage = () => {
  const { query } = useRouter()
  console.log('query:', query)

  const userId = (query.uid || '') as string
  const { userInfo, otherUserInfo } = useUserStore()

  // const currenUserAddr = String(userInfo?.wallet_address || '')
  // const followersResults = useUserList(UserListType.Followers)
  // const followingResults = useUserList(UserListType.Following)

  // const refetchFollow = () => {
  //   followersResults.refetch()
  //   followingResults.refetch()
  // }

  return (
    <AccountProvider
      value={{
        userInfo: otherUserInfo,
        useUserInfo: useUserInfo,
        isPending: false,
        isOtherUser: userInfo?.user_id !== userId,
        isAgent: query.t === UserCategory.Agent,
        // followers: agentFollowers,
        followingResults: () => { },
        refetchFollow: () => { },
        refetchUserInfo: () => { },
      }}
    >
      <div className="flex-1 min-h-main flex flex-col overflow-auto max-w-[800px] mx-auto">
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
        {query.t === 'agent' ? (
          <AgentUserInfo className="mx-0 !w-full max-w-full" />
        ) : (
          <AccountTab />
        )}
      </div>
    </AccountProvider>
  )
}

AccountPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>

    {page}
  </PrimaryLayout>
)

export default AccountPage
