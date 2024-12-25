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
import { useRouter } from 'next/router'
import { Routes } from '@/routes'

interface PostMenuProps {
  isCollapsed: boolean
}

export const PostMenu = ({ isCollapsed }: PostMenuProps) => {
  const { t } = useTranslation()
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()
  const [show, setShow] = useState(false)

  const toCreatePage = (id: string) => {
    router.replace(Routes.Create + '?type=' + id)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full" asChild>
          <Button className="ml-[1px]  w-[220px] max-xl:w-[120px] bg-black h-[54px] flex space-x-3 rounded-full">
            <span className="text-xl">{t('post')}</span>
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
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => toCreatePage('0')}
          >
            {t('create.token')}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => toCreatePage('1')}
          >
            {t('create.agent.token')}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => toCreatePage('2')}
          >
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
