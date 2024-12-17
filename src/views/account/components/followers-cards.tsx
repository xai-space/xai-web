import React from 'react'
import { useTranslation } from 'react-i18next'

import { FollowCard, FollowCardSkeleton } from './follow-card'
import { CustomSuspense } from '@/components/custom-suspense'
import { UserFollowersRes, UserListRes, UserListType } from '@/api/user/types'

interface Props {
  cards?: UserFollowersRes
  // total: number
  // isLoading: boolean
  // isPending?: boolean
  onCardClick?: () => void
}

export const FollowersCards = ({
  cards,
  // total,
  // isLoading,
  // isPending,
  onCardClick,
}: Props) => {
  const { t } = useTranslation()

  console.log(cards)

  return (
    <CustomSuspense
      className="flex flex-col gap-2"
      // isPending={isLoading}
      fallback={<FollowCardSkeleton />}
      nullback={<p className="text-zinc-500">{t('follow.no-followers')}</p>}
    >
      {cards?.agent?.map((f, i) => (
        <FollowCard card={f} key={i} onClick={onCardClick} />
      ))}
      {cards?.user?.map((f, i) => (
        <FollowCard card={f} key={i} onClick={onCardClick} />
      ))}
    </CustomSuspense>
  )
}

export default FollowersCards
