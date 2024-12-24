import { cn } from '@/lib/utils'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useArticleStore } from '@/stores/use-article-store'
const TopBar = () => {
  const { feedList, setFeedList } = useArticleStore()
  const [isActive, setIsActive] = useState(1)
  const [follow, setFollow] = useState(false)

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
  const tap = (id: number) => {
    setFeedList([])
    setFollow(id == 1 ? false : true)
    setIsActive(id)
  }
  const [isBlurred, setIsBlurred] = useState(false)
  const scrollThreshold = 200

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsBlurred(true)
      } else {
        setIsBlurred(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div
      className={cn(
        isBlurred ? styles.grass : 'bg-white',
        'fixed top-[0px] z-20 w-[798px] max-lg:[600px] max-sm:w-[100vw] h-[60px] border-b-[1px] border-[#e5e7eb]'
      )}
    >
      <div className="flex">
        {navList.map((item) => (
          <div
            key={item.id}
            onClick={() => tap(item.id)}
            className={cn(
              'flex-1 flex flex-col items-center pt-[18px] h-[60px] text-gray-500 cursor-pointer hover:bg-[#e6e6e8]',
              isActive == item.id ? 'text-black' : null
            )}
          >
            {item.title}
            <div
              className={cn(
                'w-28 h-[5px] mt-[12px] rounded-full',
                isActive == item.id ? 'bg-[#3b82f6]' : null
              )}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBar
