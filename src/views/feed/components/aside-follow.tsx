import { userApi } from '@/api/user'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/use-user-store'
interface Props {
  category: string
  id: string
}
const AsideFollow = ({ category, id }: Props) => {
  const { otherUserInfo, setOtherUserInfo } = useUserStore()

  let status: 0 | 1 = 1
  const followFetch = async (category: any, id: string) => {
    if (otherUserInfo?.is_followed) {
      status = 0
    } else {
      status = 1
    }

    const res = await userApi.postFollow({
      category: category,
      target_id: id,
      status: status,
    })
    if (status) {
      setOtherUserInfo({ ...otherUserInfo, is_followed: true })
    } else {
      setOtherUserInfo({ ...otherUserInfo, is_followed: false })
    }
  }

  return (
    <div onClick={() => followFetch(category, id)}>
      {otherUserInfo?.is_followed ? (
        <Button className="text-white rounded-full">Follow</Button>
      ) : (
        <Button className="bg-slate-400 rounded-full">Unfollow</Button>
      )}
    </div>
  )
}
export default AsideFollow
