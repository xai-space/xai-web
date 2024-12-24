import { use, useEffect, useState, type ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PrimaryLayout } from '@/components/layouts/primary'
import NoticeCardList from './components/notice-card-list'
import { useTranslation } from 'react-i18next'
import { NoticeAtion } from '@/api/user/types'
import styles from './styles.module.css'

import { cn } from '@/lib/utils'

interface NavList {
  title: string
  value: string
  id: number
}

export const NotificationPage = () => {
  const { t } = useTranslation()
  const navList: NavList[] = [
    {
      title: t('all'),
      value: 'all',
      id: 1,
    },
    {
      title: t('notice.follow'),
      value: 'follow',
      id: 2,
    },
    {
      title: t('notice.like'),
      value: 'like',
      id: 3,
    },
    {
      title: t('notice.comment'),
      value: 'comment',
      id: 4,
    },
  ]
  const [isBlurred, setIsBlurred] = useState(false)
  const [isActive, setIsActive] = useState(1)
  const [currentValue, setCurrentValue] = useState('all')
  const tap = (id: number, value: string) => {
    setIsActive(id)
    setCurrentValue(value)
  }
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
    // <div className="w-full px-10 max-sm:px-0">
    //   <Tabs defaultValue="all">
    //     <div className="fixed top-0 pt-10 z-10 h-[80px] bg-white max-sm:w-full">
    //       <TabsList className="flex justify-start border-t-0 border-l-0 border-r-0 rounded-none">
    //         {navList.map((item, index) => (
    //           <TabsTrigger
    //             className="min-w-28 text-gray-500 hover:text-black"
    //             key={index}
    //             value={item.value}
    //           >
    //             {item.title}
    //           </TabsTrigger>
    //         ))}
    //       </TabsList>
    //     </div>
    //     {navList.map((item, index) => (
    //       <TabsContent key={index} value={item.value}>
    //         <NoticeCardList action={item.value} />
    //       </TabsContent>
    //     ))}
    //   </Tabs>
    // </div>

    <div>
      <div
        className={cn(
          isBlurred ? styles.grass : 'bg-white',
          'fixed top-[0px] z-20 xl:w-[798px] lg:w-[500px] max-sm:w-[100vw] h-[60px] border-b-[1px] border-[#e5e7eb]'
        )}
      >
        <div className="flex">
          {navList.map((item, index) => (
            <div
              onClick={() => tap(item.id, item.value)}
              className={cn(
                'flex-1 flex flex-col font-semibold items-center pt-[18px] h-[60px] text-gray-500 cursor-pointer hover:bg-[#e6e6e8]',
                isActive == item.id ? 'text-black' : null
              )}
              key={index}
            >
              {item.title}
              <div
                className={cn(
                  'w-12 h-[5px] mt-[12px] rounded-full',
                  isActive == item.id ? 'bg-[#3b82f6]' : null
                )}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {navList.map((item, index) => (
          <div key={index}>
            {item.value === currentValue && (
              <NoticeCardList action={item.value} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

NotificationPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default NotificationPage
