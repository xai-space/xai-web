import React, { ComponentProps } from 'react'
import { BigNumber } from 'bignumber.js'
import { useTranslation } from 'react-i18next'

import { Progress } from '@/components/ui/progress'
import { useTokenContext } from '@/contexts/token'
import { fmt } from '@/utils/fmt'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { useEvmTokenDetails } from '@/hooks/token-details/use-evm-token-details'
import { Network } from '@/enums/contract'
import { useSolTokenDetails } from '@/hooks/token-details/use-sol-token-details'

export const TokenProgress = ({
  showDesc = true,
  className,
}: ComponentProps<'div'> & {
  showDesc?: boolean
}) => {
  const { t } = useTranslation()
  const {
    tokenInfo: {
      coin_version,
      contract_address,
      bond_version,
      bond_address,
    } = {},
    chainId,
    tokenChain,
    tokenAddr,
  } = useTokenContext()
  const tokenDetailsFc = () => {
    if (Network.Svm === tokenChain?.network) {
      return useSolTokenDetails(tokenAddr)
    }

    return useEvmTokenDetails(
      chainId,
      coin_version,
      contract_address,
      bond_version,
      bond_address
    )
  }

  const { totalSupply, progress, isGraduated } = tokenDetailsFc()

  const threshold = BigNumber(totalSupply).lte(0)
    ? t('threshold')
    : ` ${fmt.decimals(totalSupply, { fixed: 3 })} ${
        tokenChain?.native.symbol ?? ''
      } `

  return (
    <div className={cn('flex-1 relative', className)}>
      <Progress
        className={cn('h-6 border-2 border-black rounded-md')}
        indicatorClass={'bg-lime-green'}
        value={isGraduated ? 100 : progress}
      />
      {isGraduated && (
        <Badge
          variant="success"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 whitespace-nowrap"
        >
          {t('token.already-listed')}
        </Badge>
      )}
      {showDesc && (
        <div className="text-zinc-400 text-xs mt-2">
          {t('bonding-curve.token').replace('{}', threshold)}
        </div>
      )}
    </div>
  )
}

export default TokenProgress
