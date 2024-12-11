import React, { type ComponentProps } from 'react'

import { Button } from './ui/button'
import { useTranslation } from 'react-i18next'
import { useResponsive } from '@/hooks/use-responsive'
import {
  DynamicConnectButton,
  useDynamicContext,
  useIsLoggedIn,
} from '@dynamic-labs/sdk-react-core'

interface ConnectWalletProps {
  text?: string
}

export const ConnectWallet = ({
  children,
  ...props
}: ComponentProps<typeof Button> & ConnectWalletProps) => {
  const { t } = useTranslation()
  const { isMobile } = useResponsive()
  const { sdkHasLoaded, user } = useDynamicContext()
  const isLoggedIn = useIsLoggedIn()

  return isLoggedIn ? (
    children
  ) : (
    <DynamicConnectButton>
      <Button
        size={isMobile ? 'sm' : 'default'}
        disabled={!sdkHasLoaded}
        type="button"
        {...props}
      >
        {!sdkHasLoaded ? t('loading') : props.text || t('wallet.connect')}
      </Button>
    </DynamicConnectButton>
  )
}

export default ConnectWallet
