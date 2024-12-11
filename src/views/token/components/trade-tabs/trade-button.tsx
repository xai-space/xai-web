import React, { type ComponentProps, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BigNumber } from 'bignumber.js'

import { Button } from '@/components/ui/button'
import { useTradeTabsContext } from '@/contexts/trade-tabs'
import { useTokenContext } from '@/contexts/token'
import { TradeCommentDialog } from '../trade-comment-dialog'
import { useCheckAccount } from '@/hooks/use-check-chain'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { Network } from '@/enums/contract'
import { useUserStore } from '@/stores/use-user-store'
import { inviteRewardPercet } from '@/config/reward'
import { useClipboard } from '@/hooks/use-clipboard'
import ConnectWallet from '@/components/connect-wallet'

interface Props {
  onTrade: () => void
  isTrading?: boolean
}

export const TradeButton = ({
  disabled,
  isTrading,
  onTrade,
}: ComponentProps<typeof Button> & Props) => {
  const { t } = useTranslation()
  const [commentOpen, setCommentOpen] = useState(false)
  const { checkForChain } = useCheckAccount()
  const { userInfo } = useUserStore()
  const { copy } = useClipboard()
  const { playError } = useAudioPlayer()

  const { isNotFound, chainId, network, tokenMetadata } = useTokenContext()
  const {
    isBuy,
    reserveBalance: nativeBalance,
    tokenBalance,
    value,
  } = useTradeTabsContext()
  const isBalanceInsufficient = BigNumber(value).gt(
    isBuy ? nativeBalance : tokenBalance
  )

  const onTradeClick = async () => {
    if (network === Network.Evm) {
      if (!(await checkForChain(chainId))) {
        playError()
        return false
      }
    }
    if (isNotFound && tokenMetadata) return onTrade()
    setCommentOpen(true)
  }

  return (
    <>
      <TradeCommentDialog
        open={commentOpen}
        onOpenChange={setCommentOpen}
        onTrade={onTrade}
      />

      <ConnectWallet className="font-bold w-full">
        <Button
          className="!w-full font-bold"
          disabled={
            disabled ||
            !value ||
            BigNumber(value).lte(0) ||
            isBalanceInsufficient
          }
          onClick={onTradeClick}
        >
          {isBalanceInsufficient
            ? t('balance.insufficient')
            : isTrading
            ? t('trading')
            : t('trade')}
        </Button>

        <Button
          type="button"
          className="!w-full font-bold mt-3"
          onClick={() =>
            copy(`${location.origin}${location.pathname}?r=${userInfo?.code}`)
          }
        >
          {t('referral.copy')}
        </Button>
        <p className="text-xs text-zinc-500 mt-3">
          {t('referral.desc').split('$')[0]}
          {inviteRewardPercet}%{t('referral.desc').split('$')[1]}
        </p>
      </ConnectWallet>
    </>
  )
}

export default TradeButton
