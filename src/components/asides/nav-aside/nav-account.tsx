import React from 'react'
import { IoIosMore } from 'react-icons/io'

import { Avatar } from '../../ui/avatar'
import { fmt } from '@/utils/fmt'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/router'
import { UserInfoRes } from '@/api/user/types'
import { Routes } from '@/routes'
import { ConnectWallet } from '../../connect-wallet'
import { NavAccountPopover } from './nav-account-pop'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export const NavAccount = ({
  userInfo,
  isCollapsed,
}: {
  userInfo: UserInfoRes | null
  isCollapsed: boolean
}) => {
  const { pathname, ...router } = useRouter()
  const { t } = useTranslation()
  const { primaryWallet } = useDynamicContext()

  const avatar = '/images/logo.png'

  const userInfoIsCollapsed = () => {
    // TODO: wait api
    // if (userInfo) {
    if (isCollapsed) {
      return (
        <NavAccountPopover>
          <Avatar
            src={userInfo?.logo || avatar}
            className="rounded-full w-10 h-10"
          />
        </NavAccountPopover>
      )
    }

    return (
      <div className="flex items-center">
        <div
          className="flex items-end cursor-pointer"
          onClick={() =>
            router.push(`${Routes.Account}/${userInfo?.wallet_address}`)
          }
        >
          <Avatar
            src={userInfo?.logo || avatar}
            className="rounded-full w-12 h-12"
          />
          <div className="flex flex-col space-y-1">
            <span className="text-sm ml-2 font-semibold">
              {userInfo?.name || '--'}
            </span>
            <span className="text-xs ml-2 text-gray-500">
              {fmt.addr(userInfo?.wallet_address || primaryWallet?.address)}
            </span>
          </div>
        </div>

        <NavAccountPopover>
          <IoIosMore className="ml-24 cursor-pointer" />
        </NavAccountPopover>
      </div>
    )
  }
  // }

  return (
    <ConnectWallet
      // shadow={'none'}
      className={cn(
        !isCollapsed && 'w-52',
        isCollapsed && 'absolute -left-4 bottom-4 p-0 !border-8'
      )}
      text={isCollapsed ? t('connect') : undefined}
    >
      {userInfoIsCollapsed()}
    </ConnectWallet>
  )
}

export default NavAccount
