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
import { useTranslation } from 'react-i18next'
import { PublishPost } from './publish-post'
import { PublishPostDialog } from './publish-post-dialog'

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
  const { t } = useTranslation()
  const { feedList, setFeedList } = useArticleStore()
  const { userInfo } = useUserInfo()

  const getLoadMoreList = async (): Promise<Result> => {
    let start = Math.floor(feedList.length / 10) + 1

    const bodyData: FeedList = {
      page: start,
      limit: 10,
    }

    console.log('userInfo', userInfo?.user_id)

    if (isMy) {
      if (userInfo?.user_id) {
        bodyData.user_id = userInfo?.user_id
      } else {
        return {
          list: [],
          noMore: true,
        }
      }
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
    if (isMy && userInfo?.user_id) {
      mutate({
        list: [],
        noMore: true,
      })
    }
  }, [isMy, userInfo])

  if (feedList.length === 0 && !loading && !loadingMore) {
    return (
      <div className="flex h-full mt-4">
        {isMy ? (
          <div>
            <div>{t('no.post')}</div>
          </div>
        ) : (
          <FeedAsiade />
        )}
      </div>
    )
  }

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
    </div>
  )
}
