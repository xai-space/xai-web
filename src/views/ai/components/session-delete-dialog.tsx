import { aiApi } from '@/api/ai'
import { AgentSessionsList } from '@/api/ai/type'
import { Input } from '@/components/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { defaultUserId } from '@/config/base'
import { useAIAgentStore } from '@/stores/use-chat-store'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface Props {
  delSession?: AgentSessionsList
  setDelSession: (session?: AgentSessionsList) => void
}
export const SessionDeleteDialog = ({ setDelSession, delSession }: Props) => {
  const { t } = useTranslation()
  const { agentInfo, setSessionList, sessionId, setSessionId } =
    useAIAgentStore()

  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      const { code, message } = await aiApi.deleteSession({
        agent_id: agentInfo!.agent_id,
        session_id: delSession!.session_id,
        user_id: defaultUserId,
      })

      if (code == 200) {
        const { data } = await aiApi.getSessionList(agentInfo!.agent_id)

        if (sessionId === delSession?.session_id) {
          setSessionId(data[0]?.session_id)
        }

        setSessionList(data)

        setDelSession(undefined)
        return toast.success(t('delete.successful'))
      }

      toast.error(message)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={!!delSession}
      onOpenChange={(v) => {
        if (!v) setDelSession(undefined)
      }}
    >
      <DialogHeader className="font-bold">{t('delete.session')}</DialogHeader>
      <div>{t('delete.sessino.info')}</div>
      <DialogFooter>
        <DialogClose>
          <Button variant={'outline'} size={'lg'}>
            {t('cancel')}
          </Button>
        </DialogClose>
        <Button
          variant={'red'}
          size={'lg'}
          onClick={onDelete}
          isLoading={loading}
        >
          {loading ? t('deleting') : t('delete')}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
