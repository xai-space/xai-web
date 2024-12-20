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
<<<<<<< HEAD
import { useInfiniteScroll, useRequest } from 'ahooks'
import { isEmpty, get } from 'lodash-es'
import { NoticeAtion } from '@/api/user/types'
import { putReadNotices } from '@/api/user'
import { useEffect } from 'react'
=======
import { useInfiniteScroll } from 'ahooks'
import { isEmpty, get } from 'lodash-es'
>>>>>>> e7d9784 (feat: notice)
interface Result {
  list: UserNotificationList[]
  noMore?: boolean
}
<<<<<<< HEAD
interface NoticeCardListProps {
  action: string
}
let start = 0
const NoticeCardList = ({ action }: NoticeCardListProps) => {
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

    const { data } = await aiApi.getNotifications(params)
    return {
      list: data.list,
      noMore: data.list.length !== 20,
    }
  }

  const { data, loading, loadMore, loadingMore, noMore, mutate, reload } =
    useInfiniteScroll(getLoadMoreList, {
      manual: true,
      target: document,
      isNoMore: (d) => d?.noMore === true,
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

  useRequest(putReadNotices, {
    onSuccess: (data) => {
      console.log('dataRead', data)
    },
  })

  return (
    <div className="pt-20">
      {data?.list.map((item, index) => (
=======
const NoticeCardList = () => {
  const getLoadMoreList = async (): Promise<Result> => {
    const { data } = await aiApi.getNotifications({
      page: 1,
      limit: 20,
    })
    return {
      list: data.list,
      noMore: data.list.length < 20,
    }
  }

  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    getLoadMoreList,
    {
      target: document,
      isNoMore: (d) => d?.noMore === true,
    }
  )

  return (
    <div className="pt-20">
      {data?.list.map(({ data }, index) => (
>>>>>>> e7d9784 (feat: notice)
        <div className="mb-4" key={index}>
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="mr-2">
                <Avatar>
                  <AvatarImage
                    src={
<<<<<<< HEAD
                      isEmpty(item.data.from_user.logo)
                        ? `${staticUrl}${item.data.from_user.logo}`
=======
                      isEmpty(data.from_user.logo)
                        ? `${staticUrl}${data.from_user.logo}`
>>>>>>> e7d9784 (feat: notice)
                        : defaultAgentLogo
                    }
                  />
                  <AvatarFallback>...</AvatarFallback>
                </Avatar>
              </div>
              <div>
<<<<<<< HEAD
                <CardTitle>
                  {get(item, 'data.from_user.name', '-')}

                  {`  ${item.action} you`}
                </CardTitle>
                <CardDescription>
                  <div className="line-clamp-3 overflow-hidden text-ellipsis whitespace-pre-wrap">
                    {get(item, 'data.from_user.description', '-')}
=======
                <CardTitle>{get(data, 'from_user.name', '-')}</CardTitle>
                <CardDescription>
                  <div className="line-clamp-3 overflow-hidden text-ellipsis whitespace-pre-wrap">
                    {get(data, 'from_user.description', '-')}
>>>>>>> e7d9784 (feat: notice)
                  </div>
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default NoticeCardList
