import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useResponsive } from '@/hooks/use-responsive'
import { ComponentProps, useState } from 'react'

import { Button } from '../ui/button'

export const ChangeChainWallets = ({
  ...props
}: ComponentProps<typeof Button>) => {
  const { t } = useTranslation()
  const { isConnecting } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { isMobile } = useResponsive()
  const [isOpening, setIsOpening] = useState(false)

  return (
    <>
      <Button
        size={isMobile ? 'sm' : 'default'}
        disabled={isConnecting}
        type="button"
        onClick={() => openConnectModal?.()}
        {...props}
      >
        {isConnecting ? t('wallet.connecting') : t('wallet.connect')}
      </Button>
    </>
  )
}
