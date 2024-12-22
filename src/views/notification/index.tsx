import { type ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PrimaryLayout } from '@/components/layouts/primary'
import NoticeCardList from './components/notice-card-list'
import { useTranslation } from 'react-i18next'

interface NavList {
  title: string
  value: string
}

export const NotificationPage = () => {
  const { t } = useTranslation()
  const navList: NavList[] = [
    {
      title: t('all'),
      value: 'all',
    },
    {
      title: t('following'),
      value: 'follow',
    },
  ]
  return (
    <div className="w-full px-10 max-sm:px-0">
      <Tabs defaultValue="all">
        <div className="fixed z-10">
          <TabsList className="flex justify-start bg-[#000]">
            {navList.map((item, index) => (
              <TabsTrigger className="min-w-24" key={index} value={item.value}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="all">
          <NoticeCardList />
        </TabsContent>
        <TabsContent value="follow">follow</TabsContent>
      </Tabs>
    </div>
  )
}

NotificationPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default NotificationPage
