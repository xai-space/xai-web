import { aiApi } from '@/api/ai'
import { AgentListResItem } from '@/api/ai/type'
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
  delAgent?: AgentListResItem
  setDelAgent: (session?: AgentListResItem) => void
  onDeleted: () => void
}
export const AgentDeleteDialog = ({
  setDelAgent,
  onDeleted,
  delAgent,
}: Props) => {
  const { t } = useTranslation()
  const { agentInfo, setAgentInfo } = useAIAgentStore()

  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      const { code, message } = await aiApi.deleteAgent(delAgent!.agent_id)

      if (code == 200) {
        onDeleted()
        setDelAgent(undefined)
        if (agentInfo?.agent_id === delAgent?.agent_id) {
          setAgentInfo(undefined)
        }
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
      open={!!delAgent}
      onOpenChange={(v) => {
        if (!v) setDelAgent(undefined)
      }}
    >
      <DialogHeader className="font-bold">
        {t('delete.agent.title')}
      </DialogHeader>
      <div>{t('delete.agent.info')}</div>
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
