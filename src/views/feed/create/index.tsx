import { type ReactNode } from 'react'

import { PrimaryLayout } from '@/components/layouts/primary'
import { ArticleCreate } from '../components/article-create'

export const CreatePage = () => {
  return (
    <div>
      <ArticleCreate />
    </div>
  )
}

CreatePage.getLayout = (page: ReactNode) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default CreatePage
