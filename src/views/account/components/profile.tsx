import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useAccountContext } from '@/contexts/account'
import { useUser } from '@/hooks/use-user'
import { useRouter } from 'next/router'
import { cn } from '@/lib/utils'
import { UserInfoRes, UserUpdateReq } from '@/api/user/types'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { ApiResponse } from '@/api/types'
import AccountInfoDesktop from './account-info-desktop'
import { useResponsive } from '@/hooks/use-responsive'
import AccountInfoMoblie from './account-info-mobile'

export interface AccountInfoProps {
  isOtherUser: boolean
  isAgent: boolean
  update: UseMutateAsyncFunction<
    ApiResponse<UserInfoRes>,
    Error,
    UserUpdateReq,
    string | number
  >
  refetchUserInfo: VoidFunction
}

export const Profile = () => {
  const { isAgent, isOtherUser, refetchUserInfo, refetchFollow } =
    useAccountContext()
  const { update } = useUser({
    onFollowFinlly: () => {
      refetchUserInfo()
      refetchFollow()
    },
  })

  const { isPad } = useResponsive()

  return (
    <div className="flex-1 rounded-md">
      <div
        className="bg-cover bg-center h-[200px]"
        style={{ backgroundImage: `url(/images/profile-bg.jpg)` }}
      />
      <div className="bg-background px-4 pt-2 relative after:absolute after:w-full after:h-px after:bottom-5 after:left-0">
        {!isPad ? (
          <AccountInfoDesktop
            isAgent={isAgent}
            isOtherUser={isOtherUser}
            update={update}
            refetchUserInfo={refetchUserInfo}
          />
        ) : (
          <AccountInfoMoblie
            isAgent={isAgent}
            isOtherUser={isOtherUser}
            update={update}
            refetchUserInfo={refetchUserInfo}
          />
        )}
      </div>
    </div>
  )
}

export default Profile

export const HoverCardPop = ({
  children,
  content,
  variant = 'center',
  position = 'bottom',
  className,
}: {
  children: React.ReactNode
  content: string
  variant?: 'start' | 'center' | 'end'
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}) => (
  <HoverCard>
    <HoverCardTrigger asChild>{children}</HoverCardTrigger>
    <HoverCardContent
      className={cn(
        'p-1 w-32 border-none text-center font-medium text-base',
        className
      )}
      align={variant}
      side={position}
    >
      {content}
    </HoverCardContent>
  </HoverCard>
)
