import { userApi } from '@/api/user'
import { useUserStore } from '@/stores/use-user-store'
import { useState } from 'react'
import { toast } from 'sonner'
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
    try {
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
    } catch (error: any) {
      if (error.status === 401) {
        toast.error('Please connect wallet first')
      }
    }
  }

  return (
    <div onClick={followFetch}>
      {item.is_followed ? (
        <div
          className="rounded-full px-4 py-1 text-[14px] text-center font-medium border-[1px] 
            border-[#CFD9DE] bg-white text-black
            hover:bg-red-50 hover:text-red-600 hover:border-red-200
            group"
        >
          <span className="group-hover:hidden">Following</span>
          <span className="hidden group-hover:inline">Unfollow</span>
        </div>
      ) : (
        <div className="rounded-full text-center px-4 py-1 text-[14px] bg-black text-white font-medium border-[#000] border-[1px] hover:bg-gray-800">
          Follow
        </div>
      )}
    </div>
  )
}
export default AsideFollow
