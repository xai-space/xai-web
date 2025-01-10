import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { officialLinks } from '@/config/link'

import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { CgMoreO } from 'react-icons/cg'
import { PublishPost } from '@/components/publish-post'
import { Button } from '@/components/ui/button'
import { useLang } from '@/hooks/use-lang'
import { IoLanguageOutline } from 'react-icons/io5'
import ShareMenus from './share-menus'

interface PostMenuProps {
  isCollapsed: boolean
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}
const fontStyle = 'cursor-pointer text-[15px] text-[#0f1419] font-semibold'
export const MoreMenus = ({
  isCollapsed,
  isOpen,
  setIsOpen,
}: PostMenuProps) => {
  const { t, i18n } = useTranslation()
  const { setLang } = useLang()

  const [show, setShow] = useState(false)

  return (
    <>
      <DropdownMenu
        open={isOpen}
        onOpenChange={() => {
          if (isOpen) {
            setIsOpen && setIsOpen(false)
          }
        }}
      >
        <DropdownMenuTrigger className="pr-0 pl-0" asChild>
          <Button variant="none">
            <CgMoreO size={28} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          className="border-[#e5e5e5]"
        >
          {/* <DropdownMenuItem>
            <div
              className="flex py-2 px-2 pr-10"
              onClick={() =>
                i18n.language === 'en' ? setLang('zh') : setLang('en')
              }
            >
              <div>
                <IoLanguageOutline size={24} />
              </div>
              <div className="ml-[24px] text-[20px] text-[#0f1419] font-semibold">
                Translate
              </div>
            </div>
          </DropdownMenuItem> */}
          <ShareMenus
            x={officialLinks.x}
            tg={officialLinks.tg}
            whitepaper={officialLinks.whitepaper}
            size={20}
            buttonProps={{
              size: isCollapsed ? 'icon' : 'icon-lg',
              className: isCollapsed
                ? 'w-full bg-black text-white'
                : 'bg-black text-white',
            }}
          ></ShareMenus>
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
