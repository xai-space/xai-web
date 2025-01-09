import { useEffect, useState, type ReactNode } from 'react'
import { PrimaryLayout } from '@/components/layouts/primary'
import NoticeCardList from './components/notice-card-list'
import { useTranslation } from 'react-i18next'
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