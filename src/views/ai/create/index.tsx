import PrimaryLayout from '@/components/layouts/primary'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft } from 'react-icons/fa6'
import { useRouter } from 'next/router'
import { AIAgentForm } from '../components/ai-agent-form'

const AIAgentPage = () => {
  const { t } = useTranslation()

  const { back } = useRouter()

  return (
    <div className="max-w-[800px] flex mx-auto relative">
      <FaChevronLeft
        color="#ffffff"
        className="absolute top-[3px] left-0 cursor-pointer"
        onClick={back}
      ></FaChevronLeft>
      <div className="flex-1 flex flex-col items-center">
        <div className="font-bold mb-4">{t('create.agent')}</div>
        <AIAgentForm isCreate={true}></AIAgentForm>
      </div>
    </div>
  )
}

AIAgentPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default AIAgentPage
