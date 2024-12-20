import { type ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { PrimaryLayout } from '@/components/layouts/primary'
import NoticeCardList from './components/notice-card-list'
interface NavList {
  title: string
  value: string
}
const navList: NavList[] = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Follow',
    value: 'follow',
  },
]

export const NotificationPage = () => {
  return (
    <div className="w-full px-10 max-sm:px-0">
      <Tabs defaultValue="all">
        <div className="fixed w-[71vw] z-10">
          <div>
            <TabsList className="flex justify-start bg-[#000]">
              {navList.map((item, index) => (
                <TabsTrigger
                  className="flex-auto"
                  key={index}
                  value={item.value}
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
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
