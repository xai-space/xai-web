import { useState, type ReactNode } from 'react'

import { PrimaryLayout } from '@/components/layouts/primary'
import { PostFeed } from '@/components/post-feed'
import { cn } from '@/lib/utils'
import { useArticleStore } from '@/stores/use-article-store'
import styles from './styles.module.css'

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
    <div className="flex">
      <div className="flex-1 max-sm:mt-2 ">
        <div
          className={cn(
            styles.grass,
            'fixed top-[0px] bg-white z-20 w-[800px] max-lg:[600px] max-sm:w-[100vw] h-[60px] border-b-[1px] border-[#e5e7eb]'
          )}
        >
          <div className="flex py-2 px-2 justify-around ">
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
        </div>
        <PostFeed follow={follow}></PostFeed>
      </div>
    </div>
  )
}

FeedPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default FeedPage
