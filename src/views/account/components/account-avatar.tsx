import { isEmpty } from 'lodash'
import { useMemo, useRef, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { ApiResponse } from '@/api/types'
import { UserInfoRes, UserUpdateReq } from '@/api/user/types'
import ImageUpload from '@/components/image-upload'
import { Avatar } from '@/components/ui/avatar'
import { Dialog } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useResponsive } from '@/hooks/use-responsive'
import { useUploadImage } from '@/hooks/use-upload-image'
import { cn } from '@/lib/utils'
import { defaultUserLogo } from '@/config/link'
import { staticUrl } from '@/config/url'
import { useUserInfo } from '@/hooks/use-user-info'

export const AccountAvatar = ({
  isOtherUser,
  isAgent,
  update,
}: {
  isOtherUser: boolean
  isAgent: boolean
  update: UseMutateAsyncFunction<
    ApiResponse<UserInfoRes>,
    Error,
    UserUpdateReq,
    string | number
  >
}) => {
  const [open, setOpen] = useState(false)
  const { otherUserInfo, userInfo, agentInfo, refetchUserInfo } = useUserInfo()
  const inputRef = useRef<HTMLInputElement>(null)

  const avatar = useMemo(() => {
    if (isAgent) {
      return agentInfo?.logo
    }
    if (isOtherUser) {
      return otherUserInfo?.logo
    }
    return userInfo?.logo
  }, [isOtherUser, otherUserInfo, userInfo, agentInfo])

  const { onChangeUpload, clearFile } = useUploadImage({
    inputEl: inputRef.current,
    onSuccess: (url) =>
      update({
        logo: url?.[0]?.url,
        name: userInfo?.name,
        description: userInfo?.description,
      }).then(() =>
        refetchUserInfo({
          userId: userInfo?.user_id!,
          isOther: false,
        })
      ),
  })
  const { isPad } = useResponsive()

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        contentProps={{ className: 'max-w-[40vw]' }}
      >
        <img
          src={`${staticUrl}${otherUserInfo?.logo}`}
          alt="avatar"
          className="w-full h-full object-fill"
        />
      </Dialog>

      <Label
        htmlFor="avatar-edit"
        className={cn(
          !isPad &&
            "relative block after:block group after:content-[''] after:w-full after:h-full after:absolute after:inset-0 cursor-pointer",
          !isOtherUser &&
            !isPad &&
            'after:rounded-full hover:after:bg-black/50 after:transition-all '
        )}
        onClick={() => {
          clearFile()
          if (isOtherUser && !isEmpty(otherUserInfo?.logo)) {
            setOpen(true)
          }
        }}
      >
        <Avatar
          src={avatar ? `${staticUrl}${avatar}` : defaultUserLogo}
          // fallback={userInfo?.wallet_address.slice(-4)}
          size={128}
          className="border-4 border-zinc-100 bg-gray-50 -mt-[70px]"
        />
        {!isOtherUser && (
          <>
            <AiOutlineEdit
              size={26}
              className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/4',
                'z-50 opacity-0 group-hover:opacity-100 transition-all text-white'
              )}
            />
            <ImageUpload
              id="avatar-edit"
              className="absolute invisible"
              ref={inputRef}
              onChange={(e) => onChangeUpload(e, true)}
            />
          </>
        )}
      </Label>
    </div>
  )
}

export default AccountAvatar
