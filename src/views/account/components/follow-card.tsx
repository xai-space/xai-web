import React, { type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

import { UserCategory, type FollowItem } from '@/api/user/types'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/hooks/use-user'
import { useAccountContext } from '@/contexts/account'
import { Routes } from '@/routes'
import { joinPaths } from '@/utils'
import { staticUrl } from '@/config/url'

export enum CardType {
  following = 'following',
  follower = 'follower',
}

interface Props extends ComponentProps<typeof Card> {
  card: FollowItem
  cardType: CardType
}

export const FollowCard = ({ card, cardType, onClick }: Props) => {
  const { t } = useTranslation()
  const { query, ...router } = useRouter()
  const { userInfo, refetchFollow, isOtherUser } = useAccountContext()
  const { handleFollow, isHandling } = useUser()

  return (
    <Card
      className="py-2 px-3 flex items-center justify-between"
      hover="bg"
      shadow="none"
      onClick={(e) => {
        router.push(joinPaths(Routes.Account, card.user_id! || card.agent_id!))
        onClick?.(e)
      }}
    >
      <div className="flex items-center gap-2">
        <Avatar src={`${staticUrl}${card.logo}`} fallback={card.name} />
        <div className="flex flex-col">
          <p className="font-bold">{card.name}</p>
          <p className="text-gray-500 text-sm truncate">{card.description}</p>

          {/* <p className="text-zinc-500 text-sm">{fmt.addr(card.name)}</p> */}
        </div>
      </div>
      {/* {!isOtherUser && (
        <Button
          size="xs"
          variant="outline"
          onClick={async (e) => {
            e.stopPropagation()
            await handleFollow({
              status: card.is_followed ? 0 : 1,
              category: card.agent_id!
                ? UserCategory.Agent
                : UserCategory.User,
              target_id: card.agent_id! || card.user_id!,
            })
          }}
        >
          {cardType === CardType.follower
            ? card.is_followed
              ? `${t('unfollow')}`
              : `${t('follow')}`
            : '这个不是粉丝列表'}
        </Button>
      )} */}
    </Card>
  )
}

export const FollowCardSkeleton = () => {
  return Array.from({ length: 3 }).map((_, i) => (
    <Card key={i} padding="md" className="flex gap-2 relative">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col justify-between">
        <Skeleton className="w-32 h-4 rounded-full" />
        <Skeleton className="w-20 h-4 rounded-full" />
      </div>
      <Skeleton className="w-14 h-6 absolute right-4 top-1/2 -translate-y-1/2" />
    </Card>
  ))
}

export default FollowCard
