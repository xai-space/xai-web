import { feedApi } from '@/api/feed'
import { useArticleStore } from '@/stores/use-article-store'
import ArticleCard from '@/views/feed/components/article-card'
import { FeedAsiade } from '@/views/feed/components/article-sider'
import { useInfiniteScroll } from 'ahooks'
import { ListLoading } from './loading'
import { FeedList, FeedListItem } from '@/api/feed/types'
import { useEffect, useState } from 'react'
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

export const AgentUserInfo = ({
  className,
  isMy = false,
  follow = false,
}: Props) => {
  // const { data, isFetching, isLoading, fetchNextPage } = useFeeds()
  const { t } = useTranslation()
  const { postsList, setPostsList } = useArticleStore()
  const { otherUserInfo } = useUserInfo()
  const { query } = useRouter()
  const [isReset, setIsReset] = useState(true)

  const getLoadMoreList = async (): Promise<Result> => {
    try {
      const start = isReset ? 1 : Math.floor(postsList.length / 10) + 1

      const bodyData: FeedList = {
        page: start,
        limit: 10,
        follow: follow,
      }

      if (query.t === UserCategory.Agent) {
        bodyData.agent_id = query.uid as string
      } else {
        if (otherUserInfo?.user_id) {
          bodyData.user_id = otherUserInfo?.user_id
        } else {
          return {
            list: [],
            noMore: true,
          }
        }
      }

      const { data } = await feedApi.getList(bodyData)

      if (data?.list) {
        setPostsList(postsList.concat(data?.list))
        return {
          list: data?.list,
          noMore: data?.list.length !== 10,
        }
      }

      return {
        list: [],
        noMore: true,
      }
    } catch (e) {
      return {
        list: [],
        noMore: true,
      }
    } finally {
      setIsReset(false)
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
    postsList.splice(i, i + 1)
    setPostsList([...postsList])
  }

  const onEdited = () => {
    setPostsList([...postsList])
  }

  useEffect(() => {
    if (query.uid || query.t) {
      setIsReset(true)
      setPostsList([])
      mutate({
        list: [],
        noMore: true,
      })
      reload()
    }
  }, [query.uid, query.t])

  useEffect(() => {
    mutate({
      list: [],
      noMore: true,
    })
    reload()
  }, [follow])

  if (postsList.length === 0 && !loading && !loadingMore) {
    return (
      <div className="flex h-full mt-4">
        {isMy ? (
          <div>
            <div className="pl-4">{t('no.post')}</div>
          </div>
        ) : (
          <FeedAsiade />
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col border-t border-[#e5e5e5] max-w-[600px] mx-auto p-0 mt-0',
        className
      )}
    >
      {postsList?.map((item, i) => (
        <ArticleCard
          key={i}
          article={item}
          onDeleted={() => onDeleted(i)}
          onEdited={onEdited}
        />
      ))}
      {(loading || loadingMore) && <ListLoading />}
    </div>
  )
}
