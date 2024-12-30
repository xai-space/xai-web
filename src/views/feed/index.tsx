import { useEffect, useState, type ReactNode } from 'react'

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
  const [isBlurred, setIsBlurred] = useState(false)

  useEffect(() => {
    const container = document.querySelector('.scroll-container')
    
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.scrollTop >= 100) {
        setIsBlurred(true)
      } else {
        setIsBlurred(false)
      }
    }

    container?.addEventListener('scroll', handleScroll)

    return () => {
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className="relative flex flex-col">
      <div
        className={cn(
          isBlurred ? styles.grass : 'bg-white',
          'sticky top-0 z-20 border-b-[1px] border-[#e5e7eb]'
        )}
      >
        <div className="flex">
          {navList.map((item) => (
            <div
              key={item.id}
              onClick={() => tap(item.id)}
              className={cn(
                'flex-1 h-[53px] cursor-pointer hover:bg-[#e6e6e8]',
                'flex flex-col justify-between'
              )}
            >
              <div className="flex-1 flex items-center justify-center">
                <span className={cn(
                  'text-[15px]',
                  isActive == item.id ? 'text-black' : 'text-gray-500'
                )}>
                  {item.title}
                </span>
              </div>
              <div className="flex justify-center">
                <div
                  className={cn(
                    ' h-[4px] min-w-[68px] rounded-full',
                    isActive == item.id ? 'bg-[#3b82f6]' : null
                  )}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PostFeed follow={follow}></PostFeed>
    </div>
  )
}

FeedPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default FeedPage
