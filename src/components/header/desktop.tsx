import React, { type ComponentProps } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import type { Nav } from './'
import { RewardButton } from '../reward-button'
import { AccountDropdown } from '../account-dropdown'
import ConnectWallet from '../connect-wallet'

interface Props extends ComponentProps<'div'> {
  navs: Nav[]
  onNavClick?: (nav: Nav) => void
}

export const HeaderDesktop = ({ navs, onNavClick }: Props) => {
  const { pathname, ...router } = useRouter()
  const { t } = useTranslation()

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <RewardButton />
        <ConnectWallet>
          <AccountDropdown />
        </ConnectWallet>
      </div>
    </>
  )
}

export default HeaderDesktop
