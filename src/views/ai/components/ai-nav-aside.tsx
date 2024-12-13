'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { aiApi } from '@/api/ai'
import { AgentSessionsAllRes } from '@/api/ai/type'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Rename } from './rename'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { defaultUserId } from '@/config/base'

export const AINavAsiade = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const [list, setList] = useState<AgentSessionsAllRes[]>()

  useEffect(() => {
    const handle = async () => {
      const list = await aiApi.getAllSession({
        agent_id: '001f6b5d-1249-4abe-a6a8-003d4a037dcf',
      })
      if (list.data && Array.isArray(list.data)) {
        setList(list.data)
      }
    }
    handle()
  }, [])

  return (
    <div className="h-full fixed top-0 right-0 border-l p-4">
      <div className="sticky top-0 max-w-40">
        <Button
          className="mb-4 w-full py-3"
          onClick={() => push(Routes.AICreate)}
        >
          {t('create.agent')}
        </Button>

        <Button
          className="mb-4 w-full py-3"
          onClick={() => push(Routes.AIList)}
        >
          {t('agent.list')}
        </Button>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="p-0 w-full">
            <AccordionTrigger className="bg-border-bg rounded-md w-40">
              <div className="px-4">{t('ai.chat_list')}</div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 pt-2 justify-start">
              {list &&
                list.map((item, index) => (
                  <Link key={index} href={`/ai/chat/${item.session_id}`}>
                    <Button className="w-full relative">
                      <span className="truncate block text-left">
                        {item.title}
                      </span>
                      <Rename />
                    </Button>
                  </Link>
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default AINavAsiade
