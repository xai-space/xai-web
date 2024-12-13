import { Routes } from '@/routes'
import { useRouter } from 'next/router'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogOverlay } from './ui/dialog'
import { PublishPost } from './publish-post'

export const PublishPostDialog = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  return (
    <>
      <Button
        className="w-full !mt-5"
        variant="purple"
        size={'lg'}
        onClick={() => {
          setShow(true)
        }}
      >
        {t('publish.post')}
      </Button>

      <Dialog
        open={show}
        contentProps={{
          className: 'p-4',
        }}
        modal={true}
        onOpenChange={() => setShow(false)}
      >
        <PublishPost onPosted={() => setShow(false)}></PublishPost>
      </Dialog>
    </>
  )
}
