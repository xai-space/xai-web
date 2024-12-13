import { feedApi } from '@/api/feed'
import { useArticleStore } from '@/stores/use-article-store'
import ArticleCard from '@/views/feed/components/article-card'
import { FeedAsiade } from '@/views/feed/components/article-sider'
import { useInfiniteScroll } from 'ahooks'
import { ListLoading } from './loading'
import { FeedList, FeedListRes } from '@/api/feed/types'
import { FC, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useUserInfo } from '@/hooks/use-user-info'

interface Result {
  list: FeedListRes[]
  noMore: boolean
}

interface Props {
  className?: string
  isMy?: boolean
}

export const PostFeed = ({ className, isMy = false }: Props) => {
  // const { data, isFetching, isLoading, fetchNextPage } = useFeeds()
  const { feedList, setFeedList } = useArticleStore()
  const { userInfo } = useUserInfo()

  const getLoadMoreList = async (): Promise<Result> => {
    let start = Math.floor(feedList.length / 10) + 1

    const bodyData: FeedList = {
      page: start,
      limit: 10,
    }

    if (isMy && userInfo?.user.id) {
      bodyData.user_id = userInfo?.user.id
    }

    const { data } = await feedApi.getList(bodyData)

    setFeedList(feedList.concat(data))

    return {
      list: data,
      noMore: data.length !== 10,
    }
  }

  const { loading, loadingMore, mutate } = useInfiniteScroll(
    () => getLoadMoreList(),
    {
      target: document,
      isNoMore: (d) => d?.noMore === true,
    }
  )

  const onDeleted = (i: number) => {
    feedList.splice(i, i + 1)
    setFeedList([...feedList])
  }

  const onEdited = () => {
    setFeedList([...feedList])
  }

  useEffect(() => {
    if (isMy && userInfo?.user.id) {
      mutate({
        list: [],
        noMore: true,
      })
    }
  }, [isMy, userInfo])

  return (
    <div
      className={cn('flex flex-col border max-w-[600px] mx-auto', className)}
    >
      {feedList?.map((item, i) => (
        <ArticleCard
          key={item.agent_id}
          article={item}
          onDeleted={() => onDeleted(i)}
          onEdited={onEdited}
        />
      ))}
      {(loading || loadingMore) && <ListLoading />}
      <div>
        <FeedAsiade />
      </div>
    </div>
  )
}
