import { type ReactNode } from 'react'

import { PrimaryLayout } from '@/components/layouts/primary'
import { PostFeed } from '@/components/post-feed'

import { useHeadBarContext } from '@/components/layouts/HeadBarContext'

export const FeedPage = () => {

  const context = useHeadBarContext()
  const { follow } = context
  console.log("fv:", follow);



  return (
    <div className="relative flex flex-col">

      <PostFeed follow={follow}></PostFeed>
    </div>
  )
}

FeedPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default FeedPage
