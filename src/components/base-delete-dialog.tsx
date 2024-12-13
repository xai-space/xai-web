import { aiApi } from '@/api/ai'
import { AgentInfoResDataBase, AgentListResItem } from '@/api/ai/type'
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

export enum DeleteDialogType {
  Session = 1,
  Agent,
  Post,
  Comment,
}

interface Props {
  type: DeleteDialogType
  show: boolean
  setShow: (v: any) => void
  onDelete: () => void
  loading: boolean
}

export const BaseDeleteDialog = ({
  loading,
  onDelete,
  setShow,
  show,
  type,
}: Props) => {
  const { t } = useTranslation()

  const getHeader = () => {
    if (type === DeleteDialogType.Session) {
      return t('delete.session')
    }
    if (type === DeleteDialogType.Agent) {
      return t('delete.agent.title')
    }
    if (type === DeleteDialogType.Post) {
      return t('delete.post')
    }
    if (type === DeleteDialogType.Comment) {
      return t('delete.comment.title')
    }
  }

  const getContent = () => {
    if (type === DeleteDialogType.Session) {
      return t('delete.sessino.info')
    }
    if (type === DeleteDialogType.Agent) {
      return t('delete.agent.info')
    }
    if (type === DeleteDialogType.Post) {
      return t('delete.post.info')
    }
    if (type === DeleteDialogType.Comment) {
      return t('delete.comment.info')
    }
  }

  return (
    <Dialog
      open={show}
      onOpenChange={(v) => {
        if (!v) setShow(undefined)
      }}
    >
      <DialogHeader className="font-bold">{getHeader()}</DialogHeader>
      <div>{getContent()}</div>
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
