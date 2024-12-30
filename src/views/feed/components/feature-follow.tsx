import { feedApi } from '@/api/feed'
import { userApi } from '@/api/user'
import { UserCategory } from '@/api/user/types'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { defaultImg } from '@/config/link'
import { useUserStore } from '@/stores/use-user-store'
import { useRequest } from 'ahooks'
import { useRouter } from 'next/router'
import AsideFollow from './aside-follow'
import { staticUrl } from '@/config/url'
import { Routes } from '@/routes'

const FeatureFollow = () => {
  const { query, push } = useRouter()

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

      return list.slice(0, list.length > 3 ? 3 : list.length)
    },
    {
      onSuccess: (res) => {
        console.log('res...:', res)

        return res
      },
    }
  )
  const toAccount = (item: any) => {
    // push(Routes.AgentInfo)

    push(
      `${Routes.Account}/${item.id}?t=${item.agent_id ? UserCategory.Agent : UserCategory.User
      }`
    )
  }
  return (
    <div className="border-[#e5e5e5] border-[1px] rounded-[16px] w-[348px] pt-4 overflow-hidden mt-[16px]">
      <p className="font-semibold mb-3 pl-4 text-[20px]">Who to follow</p>
      {data?.map((item: any, i) => (
        <div className="flex justify-between items-center px-4 py-[8px] hover:bg-[#f5f5f5] cursor-pointer" key={i}>
          <div
            className="flex items-center gap-2"
            onClick={() => toAccount(item)}
          >
            <Avatar
              src={item.logo ? `${staticUrl}${item.logo}` : defaultImg}
              size={40}
              className="cursor-pointer"
            ></Avatar>
            <div className="w-36">
              <p className="font-semibold text-[15px]">{item?.name}</p>
              <p className="text-[#536471] text-[15px] overflow-hidden whitespace-nowrap text-ellipsis">
                {item?.description}
              </p>
            </div>
          </div>
          {item && <AsideFollow item={item}></AsideFollow>}

        </div>
      ))}
      <div
        className='text-[#1d9bf0] text-left text-[15px] py-[14px] pl-4 hover:bg-[#f5f5f5] cursor-pointer'
        onClick={() => push(Routes.ConnectPage)}
      >
        Show more
      </div>
    </div>
  )
}

export default FeatureFollow
