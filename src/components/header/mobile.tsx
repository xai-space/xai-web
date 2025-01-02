import { type ComponentProps, useRef, useState } from 'react'

import { useRouter } from 'next/router'
import type { Nav } from '.'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { AccountDropdown } from '../account-dropdown'
import { useUserStore } from '@/stores/use-user-store'
import { Avatar } from '../ui/avatar'
import Logo from '../logo'
import ConnectWallet from '../connect-wallet'

interface Props extends ComponentProps<'div'> {
  navs: Nav[]
  onNavClick?: (nav: Nav) => void
}

export const HeaderMobile = () => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const { userInfo } = useUserStore()
  const [sheetOpen, setSheetOpen] = useState(false)

  //

  return (
    <>
      <Sheet
        open={sheetOpen}
        onOpenChange={(status) => {
          if (!userInfo) return
          setSheetOpen(status)
        }}
      >
        <SheetTrigger asChild ref={closeRef}>
          <div className="flex justify-start items-center space-x-2 max-sm:space-x-0">
            <div className="flex text-xl mt-1">
              <Avatar
                className="w-10 h-10 rounded-full"
                src={userInfo?.logo}
                alt="avatar"
              />
            </div>
            <Logo
              src="/images/logo.png"
              alt="logo"
              showLogo={false}
              className="mt-1 w-10 max-sm:hidden absolute"
            />
          </div>
        </SheetTrigger>

        <SheetContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          showClose={false}
          side="left"
          className="pt-4 px-2"
        ></SheetContent>
      </Sheet>

      <div className="flex justify-between items-center space-x-2 ml-1">
        <ConnectWallet>
          <AccountDropdown />
        </ConnectWallet>
      </div>
    </>
  )
}

export default HeaderMobile
