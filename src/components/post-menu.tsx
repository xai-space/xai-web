import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { FaCaretDown } from 'react-icons/fa6'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core'
import { useState } from 'react'
import { Dialog } from './ui/dialog'
import { PublishPost } from './publish-post'
import { toast } from 'sonner'

interface PostMenuProps {
  isCollapsed: boolean
}

export const PostMenu = ({ isCollapsed }: PostMenuProps) => {
  const { t } = useTranslation()
  const isLoggedIn = useIsLoggedIn()
  const [show, setShow] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full">
          <Button className="w-full bg-black text-white flex space-x-3">
            <span>{t('post')}</span>
            <FaCaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-[#e5e5e5]">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (isLoggedIn) {
                setShow(true)
              } else {
                toast.error(t('no.login'))
              }
            }}
          >
            {t('publish.post')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            {t('create.token')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            {t('create.agent.token')}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            {t('create.nft-agent.token')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
