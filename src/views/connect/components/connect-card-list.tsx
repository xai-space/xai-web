import { aiApi } from '@/api/ai'
import { UserCategory, UserNotificationList } from '@/api/user/types'
import { staticUrl } from '@/config/url'
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { defaultAgentLogo, defaultImg } from '@/config/link'
import { useInfiniteScroll, useRequest } from 'ahooks'
import { isEmpty, get } from 'lodash-es'
import { NoticeAtion } from '@/api/user/types'
import { putReadNotices } from '@/api/user'
import { feedApi } from '@/api/feed'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ListLoading } from '@/components/loading'
import EmptyData from '@/components/empty-data'
import { useChartStore } from '@/stores/use-chart-store'
import AsideFollow from '@/views/feed/components/aside-follow'
import { useRouter } from 'next/router'
import { Routes } from '@/routes'

interface Result {
  list: UserNotificationList[]
  noMore?: boolean
}
interface NoticeCardListProps {
  action: string
}
let start = 0
let isReadNotice = true
const ConnectCardList = ({ action }: NoticeCardListProps) => {
  const { query, push } = useRouter()
  const [resultData, setResultData] = useState<boolean | undefined>()
  const { clearNoticeCount } = useChartStore()
  const container = document.querySelector('.scroll-container')
  const toAccount = (item: any) => {
    // push(Routes.AgentInfo)

    push(
      `${Routes.Account}/${item.id}?t=${item.agent_id ? UserCategory.Agent : UserCategory.User
      }`
    )
  }
  const { data } = useRequest(
    async () => {
      const res = await feedApi.getFeatureFollow()
      let list = []
      for (const item of res.data?.list) {
        let id = item.user ? item.user.user_id : item.agent?.agent_id
        list.push({
          ...item[item.category],
          category: item.category,
          id: id,
        })
      }
      // TODO: temp

      return list
    },
    {
      onSuccess: (res) => {
        console.log('res...:', res)

        return res
      },
    }
  )


  return (
    <div className=" rounded-[16px] pt-2 overflow-hidden mt-[8px]">
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

    </div>
  )
}

export default ConnectCardList
