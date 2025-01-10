import { userApi } from '@/api/user'
import { FollowItem, UserCategory } from '@/api/user/types'
import PrimaryLayout from '@/components/layouts/primary'
import { defaultUserLogo } from '@/config/link'
import { staticUrl } from '@/config/url'

import { useUserStore } from '@/stores/use-user-store'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { UserListItem } from './components/user-list-item'
import { ListLoading } from '@/components/loading'
import EmptyData from '@/components/empty-data'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'

const tabs = ['Following', 'Follower']

const FollowList = () => {
  const { t } = useTranslation()
  const { otherUserInfo, agentInfo } = useUserStore()
  const [isAgent, setIsAgent] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [followList, setFollowList] = useState<FollowItem[]>([])
  const [loading, setLoading] = useState(false)
  const { query, back } = useRouter()

  const fetchFollowList = async (tabIndex: number) => {
    setLoading(true)
    try {
      const category = isAgent ? UserCategory.Agent : UserCategory.User
      const userId = query?.user_id as string
      let res

      if (tabIndex === 1) {
        res = await userApi.getFollowers({ user_id: userId, category })
      } else {
        res = await userApi.getFollows({
          user_id: userId,
          category,
        })
      }
      setFollowList(res.data?.list || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFollowList(activeTab)
  }, [activeTab, query?.user_id, isAgent])

  return (
    <div className="relative flex flex-col">
      <div className="flex justify-between items-center pl-4 pt-4 border-b border-gray-200 pb-2">
        <IoArrowBackSharp size={20} onClick={back} className="cursor-pointer" />
        <div className="ml-10 text-[#0f1419] text-[20px] font-bold">
          {otherUserInfo?.name && agentInfo?.name}
        </div>
        <div className="flex items-center space-x-2 mr-4">
          <Switch
            checked={isAgent}
            onCheckedChange={() => setIsAgent(!isAgent)}
          />
          <Label htmlFor="airplane-mode">{t('check.agent')}</Label>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              `flex-auto py-4 text-center font-medium cursor-pointer hover:bg-gray-50 relative`,
              activeTab === index
                ? 'text-black after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:rounded-full after:h-1 after:bg-[#1d9bf0]'
                : 'text-gray-500'
            )}
          >
            {tab}
          </div>
        ))}
      </div>

      <div>
        {loading ? (
          <ListLoading />
        ) : followList.length > 0 ? (
          followList.map((item, index) => (
            <UserListItem
              key={index}
              avatar={item.logo ? `${staticUrl}${item.logo}` : defaultUserLogo}
              name={item.name}
              description={item.description}
              onFollow={() => {}}
              isFollowing={false}
            />
          ))
        ) : (
          <EmptyData />
        )}
      </div>
    </div>
  )
}

FollowList.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default FollowList
