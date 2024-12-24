import { userApi } from '@/api/user'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/use-user-store'
import { useState } from 'react'
interface Props {
  category: any
  id: string
  is_followed: boolean
  is_be_followed: boolean
}
const AsideFollow = ({ item }: { item: Props }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>()
  const { otherUserInfo, setOtherUserInfo } = useUserStore()

  let status: 0 | 1 = 1
  const followFetch = async () => {
    if (item.is_followed == undefined) {
      return
    }
    setIsFollowing(item.is_followed)
    if (item.is_followed) {
      status = 0
    } else {
      status = 1
    }

    const res = await userApi.postFollow({
      category: item.category,
      target_id: item.id,
      status: status,
    })
    if (status) {
      // setOtherUserInfo({ ...otherUserInfo, is_followed: true })
      setIsFollowing(true)
      item.is_followed = true
    } else {
      // setOtherUserInfo({ ...otherUserInfo, is_followed: false })
      setIsFollowing(false)
      item.is_followed = false
    }
  }

  return (
    <div onClick={() => followFetch()}>
      {item.is_followed ? (
        <Button className="bg-slate-200 rounded-full">Unfollow</Button>
      ) : (
        <Button className="text-white rounded-full">Follow</Button>
      )}
    </div>
  )
}
export default AsideFollow
