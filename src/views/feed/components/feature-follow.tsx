import { feedApi } from '@/api/feed'
import { userApi } from '@/api/user'
import { UserCategory } from '@/api/user/types'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { defaultImg } from '@/config/link'
import { useUserStore } from '@/stores/use-user-store'
import { useRequest } from 'ahooks'
import { get } from 'lodash-es'
import { useRouter } from 'next/router'
import AsideFollow from './aside-follow'
import { staticUrl } from '@/config/url'

const FeatureFollow = () => {
  const { query } = useRouter()

  const { otherUserInfo, setOtherUserInfo } = useUserStore()

  const { data } = useRequest(
    async () => {
      const res = await feedApi.getFeatureFollow()
      let list = []
      for (const item of res.data?.list) {
        let id = item.user ? item.user.user_id : item.agent.agent_id
        list.push({
          ...item[item.category],
          category: item.category,
          id: id,
        })
      }
      // TODO: temp
      return list.slice(0, res.data.list.length - 2)
    },
    {
      onSuccess: (res) => {
        console.log('res...:', res)

        return res
      },
    }
  )

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
    <div className="border-[#e5e5e5] border-[1px] rounded-md p-4 mt-5">
      <p className="font-semibold mb-6">Who to follow</p>
      {data?.map((item: any, i) => (
        <div className="flex justify-between items-center mb-4" key={i}>
          <div className="flex items-center gap-2">
            <Avatar
              src={item.logo ? `${staticUrl}${item.logo}` : defaultImg}
              size={40}
            ></Avatar>
            <div className="w-36">
              <p className="font-semibold">{item?.name}</p>
              <p className="text-[#999] overflow-hidden whitespace-nowrap text-ellipsis">
                {item?.description}
              </p>
            </div>
          </div>
          <AsideFollow category={item.category} id={item.id}></AsideFollow>
          {/* <div onClick={() => followFetch(item.category, item.id)}>
            {otherUserInfo?.is_followed ? (
              <Button className="text-white rounded-full">Follow</Button>
            ) : (
              <Button className="bg-slate-200 rounded-full">Unfollow</Button>
            )}
          </div> */}
        </div>
      ))}
    </div>
  )
}

export default FeatureFollow
