import { aiApi } from '@/api/ai'
import { UserNotificationList } from '@/api/user/types'
import { staticUrl } from '@/config/url'
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { defaultAgentLogo } from '@/config/link'
import { useInfiniteScroll, useRequest } from 'ahooks'
import { isEmpty, get } from 'lodash-es'
import { NoticeAtion } from '@/api/user/types'
import { putReadNotices } from '@/api/user'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ListLoading } from '@/components/loading'
import EmptyData from '@/components/empty-data'
import { useChartStore } from '@/stores/use-chart-store'
interface Result {
  list: UserNotificationList[]
  noMore?: boolean
}
interface NoticeCardListProps {
  action: string
}
let start = 0
let isReadNotice = true
const NoticeCardList = ({ action }: NoticeCardListProps) => {
  const [resultData, setResultData] = useState<boolean | undefined>()
  const { clearNoticeCount } = useChartStore()
  const container = document.querySelector('.scroll-container')
  const getLoadMoreList = async (): Promise<Result> => {

    start += 1
    let params: any = { page: start, limit: 20 }
    if (action === 'all') {
      params = {
        page: start,
        limit: 20,
      }
    } else {
      params = {
        page: start,
        limit: 20,
        action,
      }
    }

    const result = await aiApi.getNotifications(params)
    console.log('result-notices:', result)

    return {
      list: result.data.list,
      noMore: result.data.list.length !== 20,
    }
  }

  const { data, loading, loadMore, loadingMore, noMore, mutate, reload } =
    useInfiniteScroll(getLoadMoreList, {
      manual: true,
      target: container,
      isNoMore: (d) => d?.noMore === true,
      onError: (err) => {
        // console.log('onError:', err)
        setResultData(false);
      },
      onFinally: (data, e) => {
        console.log('onFinally:', data, e)
      },
      onSuccess: (data) => {
        // console.log('success-data$$:', data)
        if (data.list[0].id && isReadNotice) {
          runAsync({ notification_id: data.list[0].id })
          clearNoticeCount()
          isReadNotice = false
        }
        setResultData(true);

      },
    })
  const reloadList = () => {
    mutate({
      list: [],
      noMore: true,
    })
    reload()
  }

  useEffect(() => {
    start = 0
    reloadList()
    console.log('efff...')
  }, [action])

  const { data: putReadNotice, runAsync } = useRequest(putReadNotices, {
    manual: true,
    onSuccess: (data) => {
      console.log('dataRead')
    },
  })
  // useEffect(() => {
  //   if (data?.list[0].id) {
  //     runAsync()
  //   }
  // }, [data])

  return (
    <div>
      {resultData === true ? data?.list.map((item, index) => (
        <div className="mb-4" key={index} >
          <div className="px-4 py-2 border-b border-[#e5e5e5]">
            <div className="flex flex-row items-center">
              <div className="mr-2">
                <Avatar
                  src={
                    item.data.from_user.logo
                      ? `${staticUrl}${item.data.from_user.logo}`
                      : defaultAgentLogo
                  }
                ></Avatar>
              </div>
              <div>
                <div>
                  {get(item, 'data.from_user.name', '-')}

                  {`  ${item.action} you`}
                </div>
                <div>
                  <div className="line-clamp-3 overflow-hidden text-ellipsis whitespace-pre-wrap">
                    {get(item, 'data.from_user.description', '-')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) : resultData === false ? <EmptyData /> : (loading || loadingMore) && <ListLoading />
      }
    </div>
  )
}

export default NoticeCardList
