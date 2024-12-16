import { Routes } from '@/routes'
import { useRouter } from 'next/router'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Dialog } from './ui/dialog'
import { PublishPost } from './publish-post'
import {
  DynamicConnectButton,
  useIsLoggedIn,
} from '@dynamic-labs/sdk-react-core'
import { toast } from 'sonner'

export const PublishPostDialog = () => {
  const { t } = useTranslation()
  const isLoggedIn = useIsLoggedIn()
  const [show, setShow] = useState(false)

  return (
    <>
      <DynamicConnectButton buttonClassName="w-full">
        <Button
          variant="purple"
          className="w-full"
          size={'lg'}
          onClick={(e) => {
            if (isLoggedIn) {
              e.stopPropagation()
              setShow(true)
            } else {
              toast.error(t('no.login'))
            }
          }}
        >
          {t('publish.post')}
        </Button>
      </DynamicConnectButton>

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
