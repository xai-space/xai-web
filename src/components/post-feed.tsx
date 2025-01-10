import { feedApi } from '@/api/feed'
import { useArticleStore } from '@/stores/use-article-store'
import ArticleCard from '@/views/feed/components/article-card'
import { FeedAsiade } from '@/views/feed/components/article-sider'
import { useInfiniteScroll } from 'ahooks'
import { ListLoading } from './loading'
import { FeedList, FeedListItem } from '@/api/feed/types'
import { useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useUserInfo } from '@/hooks/use-user-info'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { UserCategory } from '@/api/user/types'

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
  const { t } = useTranslation()
  const { feedList, setFeedList } = useArticleStore()
  const { otherUserInfo } = useUserInfo()
  const { query } = useRouter()
  const container = document.querySelector('.scroll-container')

  const getLoadMoreList = useCallback(async (): Promise<Result> => {
    const start = Math.floor(feedList.length / 10) + 1
    const bodyData: FeedList = {
      page: start,
      limit: 10,
      follow,
    }

    if (isMy && otherUserInfo?.user_id) {
      bodyData.user_id = otherUserInfo.user_id
    }

    if (query.t === UserCategory.Agent && query.uid) {
      bodyData.agent_id = query.uid as string
    }

    if (isMy && !otherUserInfo?.user_id) {
      return { list: [], noMore: true }
    }

    const { data } = await feedApi.getList(bodyData)

    if (data?.list) {
      setFeedList([...feedList, ...data.list])
      return { list: data.list, noMore: data.list.length !== 10 }
    }

    return { list: [], noMore: true }
  }, [feedList, follow, isMy, otherUserInfo, query])

  const { loading, loadingMore, mutate, reload } = useInfiniteScroll(
    getLoadMoreList,
    {
      target: container,
      isNoMore: (d) => d?.noMore === true,
    }
  )

  const onDeleted = useCallback(
    (i: number) => {
      const updatedList = [...feedList]
      updatedList.splice(i, 1)
      setFeedList(updatedList)
    },
    [feedList]
  )

  const onEdited = useCallback(() => {
    setFeedList([...feedList])
  }, [feedList])

  useEffect(() => {
    if (isMy && otherUserInfo?.user_id) {
      mutate({ list: [], noMore: true })
      reload()
    }
  }, [isMy, otherUserInfo, follow, mutate, reload])

  useEffect(() => {
    mutate({ list: [], noMore: true })
    reload()
  }, [follow, mutate, reload])

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
    <div className={cn('flex flex-col mx-auto', className)}>
      {feedList.map((item, i) => (
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
