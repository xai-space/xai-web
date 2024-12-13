import { aiApi } from '@/api/ai'
import { AgentSessionsList } from '@/api/ai/type'
import {
  BaseDeleteDialog,
  DeleteDialogType,
} from '@/components/base-delete-dialog'
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
    <BaseDeleteDialog
      type={DeleteDialogType.Session}
      show={!!delSession}
      loading={loading}
      onDelete={onDelete}
      setShow={setDelSession}
    ></BaseDeleteDialog>
  )
}
