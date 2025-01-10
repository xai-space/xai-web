import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { FaCaretDown } from 'react-icons/fa6'
import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Dialog } from './ui/dialog'
import { PublishPost } from './publish-post'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'
import { cn } from '@/lib/utils'
import { useWallet } from '@/hooks/use-wallet'

interface PostMenuProps {}
const fontStyle = 'cursor-pointer text-[15px] text-[#0f1419] font-semibold'
export const PostMenu = ({}: PostMenuProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [show, setShow] = useState(false)
  const { isConnected, showConnectModal } = useWallet()

  const toCreatePage = (id: string) => {
    router.replace(Routes.Create + '?type=' + id)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full" asChild>
          <Button className="w-[220px] max-xl:w-[120px] bg-black h-[52px] flex space-x-3 rounded-full">
            <span className="text-[17px] font-semibold">{t('post')}</span>
            <FaCaretDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-[#e5e5e5]">
          <DropdownMenuItem
            className={cn(fontStyle)}
            onClick={() => {
              if (isConnected) {
                setShow(true)
              } else {
                showConnectModal()
              }
            }}
          >
            {t('publish.post')}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(fontStyle)}
            onClick={() => {
              if (isConnected) {
                toCreatePage('0')
              } else {
                showConnectModal()
              }
            }}
          >
            {t('create.token')}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(fontStyle)}
            onClick={() => {
              if (isConnected) {
                toCreatePage('1')
              } else {
                showConnectModal()
              }
            }}
          >
            {t('create.agent.token')}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(fontStyle)}
            onClick={() => {
              if (isConnected) {
                toCreatePage('2')
              } else {
                showConnectModal()
              }
            }}
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
