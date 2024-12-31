import { use, useEffect, useState, type ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PrimaryLayout } from '@/components/layouts/primary'
import NoticeCardList from './components/notice-card-list'
import { useTranslation } from 'react-i18next'
import { IoArrowBackSharp } from "react-icons/io5";
import { NoticeAtion } from '@/api/user/types'
import styles from './styles.module.css'
import { useRouter } from 'next/router'

import { cn } from '@/lib/utils'

interface NavList {
  title: string
  value: string
  id: number
}

export const ConnectPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const navList: NavList[] = [
    {
      title: 'Who to follow',
      value: 'all',
      id: 1,
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
    const container = document.querySelector('.scroll-container')

    const handleScroll = () => {
      if (window.scrollY >= 100) {
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
      <div className='flex items-center pl-4 pt-4'>
        <IoArrowBackSharp size={20} onClick={() => router.back()} />
        <div className='ml-10 text-[#0f1419] text-[20px]'>Connect</div>
      </div>
      <div
        className={cn(
          isBlurred ? styles.grass : 'bg-white',
          'sticky top-0  z-20 border-b-[1px] border-[#e5e7eb]'
        )}
      >
        <div className="flex">
          {navList.map((item, index) => (
            <div
              onClick={() => tap(item.id, item.value)}
              className={cn(
                'flex-1 flex flex-col font-semibold  pl-10 pt-[18px] h-[60px] text-gray-500',
                isActive == item.id ? 'text-black' : null
              )}
              key={index}
            >
              {item.title}

            </div>
          ))}
        </div>
      </div>
      <div>
        <NoticeCardList action={'all'} />
        {/* {navList.map((item, index) => (
          <div key={index}>
            {item.value === currentValue && (
              <NoticeCardList action={item.value} />
            )}
          </div>
        ))} */}
      </div>
    </div>
  )
}

ConnectPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default ConnectPage
