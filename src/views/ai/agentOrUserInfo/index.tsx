import { feedApi } from '@/api/feed'
import { useArticleStore } from '@/stores/use-article-store'
import ArticleCard from '@/views/feed/components/article-card'
import { FeedAsiade } from '@/views/feed/components/article-sider'
import { useInfiniteScroll } from 'ahooks'
import { ListLoading } from './loading'
import { FeedList, FeedListItem } from '@/api/feed/types'
import { FC, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useUserInfo } from '@/hooks/use-user-info'
import { useTranslation } from 'react-i18next'
import { useRequest } from 'ahooks'
import { useRouter } from 'next/router'

interface Result {
  list: FeedListItem[]
  noMore: boolean
}

interface Props {
  className?: string
  isMy?: boolean
  follow?: boolean
}

export const PostFeed = ({
  className,
  isMy = false,
  follow = false,
}: Props) => {
  // const { data, isFetching, isLoading, fetchNextPage } = useFeeds()
  const { t } = useTranslation()
  const { feedList, setFeedList } = useArticleStore()
  const { otherUserInfo } = useUserInfo()
  const { query } = useRouter()
  console.log('queryFeed:', query)

  const getLoadMoreList = async (): Promise<Result> => {
    let start = Math.floor(feedList.length / 10) + 1

    const bodyData: FeedList = {
      page: start,
      limit: 10,
      follow: follow,
    }

    if (isMy) {
      if (otherUserInfo?.user_id) {
        bodyData.user_id = otherUserInfo?.user_id
      } else {
        return {
          list: [],
          noMore: true,
        }
      }
    }

    if (query.t === 'agent') {
      bodyData.agent_id = query.uid as string
    }

    const { data } = await feedApi.getList(bodyData)
    console.log('data$$:', data)

    if (data?.list) {
      setFeedList(feedList.concat(data?.list))
      return {
        list: data?.list,
        noMore: data?.list.length !== 10,
      }
    }

    return {
      list: [],
      noMore: true,
    }
  }

  const { loading, loadingMore, mutate, reload } = useInfiniteScroll(
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
    if (isMy && otherUserInfo?.user_id) {
      mutate({
        list: [],
        noMore: true,
      })
      reload()
    }
  }, [isMy, otherUserInfo, follow])

  useEffect(() => {
    mutate({
      list: [],
      noMore: true,
    })
    reload()
  }, [follow])

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
    <div className={cn('flex flex-col max-w-[600px] mx-auto', className)}>
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
