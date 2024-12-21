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
import { useInfiniteScroll } from 'ahooks'
import { isEmpty, get } from 'lodash-es'
interface Result {
  list: UserNotificationList[]
  noMore?: boolean
}

let start = 1
const NoticeCardList = () => {
  const getLoadMoreList = async (): Promise<Result> => {
    start += 1
    const { data } = await aiApi.getNotifications({
      page: start,
      limit: 20,
    })
    return {
      list: data.list,
      noMore: data.list.length !== 20,
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
      {data?.list.map((item, index) => (
        <div className="mb-4" key={index}>
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="mr-2">
                <Avatar>
                  <AvatarImage
                    src={
                      isEmpty(item.data.from_user.logo)
                        ? `${staticUrl}${item.data.from_user.logo}`
                        : defaultAgentLogo
                    }
                  />
                  <AvatarFallback>...</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <CardTitle>
                  {get(item, 'data.from_user.name', '-')}

                  {item.action === 'follow' && '  following you'}
                </CardTitle>
                <CardDescription>
                  <div className="line-clamp-3 overflow-hidden text-ellipsis whitespace-pre-wrap">
                    {get(item, 'data.from_user.description', '-')}
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
