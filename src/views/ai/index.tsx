import { ReactNode } from 'react'

import PrimaryLayout from '@/components/layouts/primary'
import AINavAsiade from './components/ai-nav-aside'

import { NewChatForm } from './components/newChat'

export const AIPage = () => {
  return (
    <div className="">
      <div className="min-h-[90vh]  flex justify-center items-center mr-28">
        <NewChatForm />
      </div>
      <AINavAsiade />
    </div>
  )
}

AIPage.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default AIPage
