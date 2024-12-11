import PrimaryLayout from '@/components/layouts/primary'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft } from 'react-icons/fa6'
import { AIAgentCreateForm } from '../components/ai-agent-create-form'
import { useRouter } from 'next/router'
import { AIAgentForm } from '../components/ai-agent-form'

const AgentEditPage = () => {
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
        <div className="font-bold mb-4">{t('edit.agent')}</div>
        <AIAgentForm isCreate={false}></AIAgentForm>
      </div>
    </div>
  )
}

AgentEditPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default AgentEditPage
