import { useState, type ReactNode } from 'react'

import { PrimaryLayout } from '@/components/layouts/primary'
import { PostFeed } from '@/components/post-feed'
import { cn } from '@/lib/utils'
import { useArticleStore } from '@/stores/use-article-store'
export const FeedPage = () => {
  const { feedList, setFeedList } = useArticleStore()

  const navList = [
    {
      title: 'Discover',
      id: 1,
      follow: false,
    },
    {
      title: 'Following',
      id: 2,
      follow: true,
    },
  ]
  const [isActive, setIsActive] = useState(1)
  const [follow, setFollow] = useState(false)
  const tap = (id: number) => {
    setFeedList([])
    setFollow(id == 1 ? false : true)
    setIsActive(id)
  }
  return (
    <div className="flex-1 max-sm:mt-2">
      <div className="w-full flex py-2 px-28 justify-around border-b-[1px] border-[#e5e7eb]">
        {navList.map((item) => (
          <div
            key={item.id}
            onClick={() => tap(item.id)}
            className={cn(
              'flex flex-col items-center text-gray-500 cursor-pointer',
              isActive == item.id ? 'text-black' : null
            )}
          >
            {item.title}
            <div
              className={cn(
                'w-28 h-1 mt-1',
                isActive == item.id ? 'bg-[#3b82f6]' : null
              )}
            ></div>
          </div>
        ))}
      </div>
      <PostFeed follow={follow}></PostFeed>
    </div>
  )
}

FeedPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default FeedPage
