import { aiApi } from '@/api/ai'
import { AgentSessionsList } from '@/api/ai/type'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog'
import { defaultUserId } from '@/config/base'
import { useAIAgentStore } from '@/stores/use-chat-store'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { isEmpty } from 'lodash'
import { loadingSVG } from '@/config/link'

interface Props {
  session?: AgentSessionsList
  setSession: (session?: AgentSessionsList) => void
}

export const SessionRenameDialog = ({ session, setSession }: Props) => {
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { agentInfo, setSessionList } = useAIAgentStore()

  const onRename = async () => {
    try {
      setLoading(true)
      const { code, message } = await aiApi.sessionReName({
        agent_id: agentInfo!.agent_id,
        session_id: session!.session_id,
        name: name,
      })

      const { data } = await aiApi.getSessionList(agentInfo!.agent_id)

      setSessionList(data)

      if (code == 200) {
        setSession(undefined)
        return toast.success(t('rename.successful'))
      }

      toast.warning(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setName(session?.title || '')
  }, [session])

  return (
    <Dialog
      open={!!session}
      onOpenChange={(v) => {
        if (!v) setSession(undefined)
      }}
    >
      <DialogHeader>{t('rename.session')}</DialogHeader>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="!text-base py-5"
      ></Input>
      <DialogFooter>
        <DialogClose>
          <Button variant={'outline'} size={'lg'}>
            {t('cancel')}
          </Button>
        </DialogClose>
        <Button
          variant={'purple'}
          size={'lg'}
          onClick={onRename}
          disabled={session?.title === name || isEmpty(name.trim())}
          isLoading={loading}
        >
          {loading ? t('confirming') : t('confirm')}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
