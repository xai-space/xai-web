import { type ComponentProps } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { zeroAddress } from 'viem'

import { Card, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Routes } from '@/routes'
import { Progress } from '../ui/progress'
import { Img } from '@/components/img'
import { Avatar } from '../ui/avatar'
import { TokenListItem } from '@/api/token/types'
import { useChainInfo } from '@/hooks/use-chain-info'
import { TokenCardBadge } from './token-card-badge'
import { Button } from '../ui/button'
import { joinPaths } from '@/utils'
import { PoolItem } from '@/hooks/token/use-tokens-pools'
import { BI_ZERO } from '@/constants/number'
import { getTokenProgress } from '@/utils/contract'
import { staticUrl } from '@/config/url'
import { Network } from '@/enums/contract'
import { useQuery } from '@tanstack/react-query'
import { programIds } from '@/program'
import { IDL } from '@/program/token/idl'
import { useProgram } from '@/packages/react-sol'
import { getCurveAccount } from '@/program/token/account'

interface Props extends ComponentProps<typeof Card> {
  card: TokenListItem
  descClass?: string

  pool: PoolItem | undefined
  onlyGraduated?: boolean
}

export const useTokenPools = (token: TokenListItem) => {
  const { program, error } = useProgram({
    idl: IDL,
    programId: programIds.programId,
  })

  const { data: pools, refetch: refetchPools } = useQuery({
    queryKey: ['getPools', token.contract_address],
    queryFn: async () => {
      if (!program) throw error

      const { curveConfig } = getCurveAccount(token.contract_address)

      const curve = await program.account['curveConfig'].fetch(curveConfig)

      return curve
    },
    enabled: !!token.contract_address,
    refetchInterval: 10_000,
  })

  const {
    graduated: isGraduated,
    solAim,
    tokenReserve,
    tokenMaxSupply,
  } = pools || {}

  return { isGraduated, solAim, tokenReserve, tokenMaxSupply }
}

export const TokenCard = ({
  card,
  className,
  descClass,
  onClick,

  pool,
  onlyGraduated,
  ...props
}: Props) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { chain, chainName } = useChainInfo(card.chain)

  const { isGraduated, tokenReserve, tokenMaxSupply } = useTokenPools(card)

  const progress = getTokenProgress(tokenReserve, tokenMaxSupply, isGraduated)

  const handleClick = () => {
    // if (!card.is_active) {
    //   toast.error(t('token.active-first'))
    //   return
    // }
    if (card.contract_address) {
      return router.push(
        joinPaths(Routes.Main, chainName, card.contract_address)
      )
    }
  }

  const handleImage = () => {
    if (/\/\//.test(card.image)) {
      return card.image
    }

    if (card.image.startsWith('http:/')) {
      return `${staticUrl}${card.image.slice(6)}`
    }
  }

  if (onlyGraduated && !isGraduated) return

  return (
    <Card
      clip={'none'}
      conPadding={'none'}
      conBackground={'none'}
      conAnimate={'none'}
      className={cn(
        ' flex items-stretch overflow-hidden cursor-pointer h-[180px] gap-2 relative max-sm:gap-0',
        className
      )}
      onClick={(e) => {
        handleClick()
        onClick?.(e)
      }}
      // shadow={card.is_active ? 'default' : 'none'}

      {...props}
    >
      <TokenCardBadge token={card} isGraduated={isGraduated!} />

      <Img
        src={handleImage()}
        alt="logo"
        title={card.name}
        className="shrink-0 mt-[20px] w-[80px] h-[80px] p-[6px] rounded-full max-sm:mr-2"
      />
      <div className="py-2.5 xl:py-5 pr-2 w-full flex flex-col justify-between">
        <div className="h-full">
          <CardTitle className="pt-0 text-lg flex items-start justify-between gap-2 ">
            <span className={cn('break-all line-clamp-2')}>
              {card?.symbol}({card?.name})
            </span>
            <Avatar
              src={`${staticUrl}${chain?.logo_url}`}
              alt="logo"
              size={20}
              className="mt-1"
              title={chain?.id}
            />
          </CardTitle>
          <p
            className={cn(
              'text-zinc-500 text-sm break-all line-clamp-2 xl:line-clamp-3',
              isGraduated && 'line-clamp-4 xl:line-clamp-4',
              descClass
            )}
          >
            {card?.description}
          </p>
        </div>
        {/* {card.is_active ? ( */}
        <Progress
          className={cn('h-5 self-end w-full')}
          indicatorClass={'bg-green-500'}
          value={progress}
        />
        {/*  ) : (
          <Button
             size="sm"
             onClick={(e) => {
               e.stopPropagation()
               toast.info('Coming Soon')
             }}
           >
             {t('token.activate')}
           </Button>
         )}*/}
      </div>
    </Card>
  )
}

export default TokenCard
