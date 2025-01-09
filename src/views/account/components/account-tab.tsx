import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

import { UserListType } from '@/api/user/types'
import { Routes } from '@/routes'
import { useAccountContext } from '@/contexts/account'
import { cn } from '@/lib/utils'
import { joinPaths } from '@/utils'
import { AgentCardList } from '@/components/agent-card-list'
import { AgentUserInfo } from '@/components/agent-user-info'
import { useArticleStore } from '@/stores/use-article-store'

export const AccountTab = () => {
  const { setPostsList } = useArticleStore()

  const { t } = useTranslation()
  const { isOtherUser } = useAccountContext()
  const [isShowBorder, setIsShowBorder] = useState(true)
  const { query, ...router } = useRouter()

  const tab = String(query.tab || UserListType.Agent)
  // const myAccountTabs = [
  //   {
  //     label: t('comments'),
  //     value: UserListType.Comments,
  //   },
  //   {
  //     label: t('mentions'),
  //     value: UserListType.Mentions,
  //   },
  // ]

  const tabs = [
    // {
    //   label: t('token.created'),
    //   value: UserListType.CoinsCreated,
    // },
    // {
    //   label: t('token.held'),
    //   value: UserListType.CoinsHeld,
    // },
    {
      label: t('agent.list'),
      value: UserListType.Agent,
    },
    {
      label: t('published.posts'),
      value: UserListType.PublishedPosts,
    },
    // {
    //   label: t('published.comments'),
    //   value: UserListType.PublishedComments,
    // },
    // ...(isOtherUser ? [] : myAccountTabs),
  ]

  // const {
  //   tokenHeld,
  //   comments,
  //   mentions,
  //   isLoading,
  //   isFetching,
  //   // fetchNextPage,

  //   myTokens,
  //   myTokenTotal,
  //   isLoadingMyTokens,
  //   isFetchingMyTokens,
  //   fetchNextMyTokens,
  // } = useUserList(Number(tab), isOtherUser)

  return (
    <div className="w-full mt-0 max-sm:mt-0 max-lg:px-3">
      <div className='border-b border-[#e5e5e5]'>
        <div className={cn(
          'h-12 max-sm:w-full max-sm:h-10 max-sm:mb-0',
          'border-none rounded-none text-base select-none flex justify-start'
        )}>
          {tabs.map((t) => (
            <button
              key={t.value}
              className={cn(
                'h-full px-8 text-[#536471] max-sm:px-2 max-sm:text-xs',
                'hover:bg-[#e7e7e7] relative transition-colors duration-200',
                tab === t.value.toString() && 'text-[#0f1419] bg-background',
                'after:absolute after:h-[4px] after:rounded-full after:bg-[#1d9bf0] after:bottom-0 after:left-0 after:w-0',
                tab === t.value.toString() && 'after:w-[60%] after:left-[20%]'
              )}
              onClick={() => {
                setPostsList([])
                if (!query.uid) return
                router.push(
                  {
                    pathname: joinPaths(Routes.Account, query.uid as string),
                    query: { tab: t.value, t: query.t },
                  },
                  undefined,
                  { shallow: true }
                )
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* My Agent */}
      {tab === UserListType.Agent.toString() && (
        <AgentCardList isAll={false} />
      )}

      {/* Published Posts */}
      {tab === UserListType.PublishedPosts.toString() && (
        <AgentUserInfo className="mx-0 !w-full max-w-full" isMy={true} />
      )}

    </div>
  )
}

export default AccountTab
