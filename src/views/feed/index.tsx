import { useEffect, useRef, useState, type ReactNode } from 'react'

import { PrimaryLayout } from '@/components/layouts/primary'
import { useFeeds } from '@/hooks/use-feeds'
import ArticleList from './components/article-list'

import { FeedAsiade } from './components/article-sider'
import { useInfiniteScroll } from 'ahooks'
import { feedApi } from '@/api/feed'
import { FeedListRes } from '@/api/feed/types'
import ArticleCard from './components/article-card'
import { ListLoading } from '@/components/loading'
import { useArticleStore } from '@/stores/use-article-store'

interface Result {
  list: FeedListRes[]
  noMore: boolean
}

export const FeedPage = () => {
  // const { data, isFetching, isLoading, fetchNextPage } = useFeeds()
  const { feedList, setFeedList } = useArticleStore()

  const getLoadMoreList = async (): Promise<Result> => {
    let start = Math.floor(feedList.length / 10) + 1

    const { data } = await feedApi.getList({
      page: start,
      limit: 10,
    })

    setFeedList(feedList.concat(data))

    return {
      list: data,
      noMore: data.length !== 10,
    }
  }

  const { loading, loadingMore } = useInfiniteScroll(() => getLoadMoreList(), {
    target: document,
    isNoMore: (d) => d?.noMore === true,
  })

  return (
    <div className="flex-1 max-sm:mt-2">
      <div className="flex flex-col border max-w-[600px] mx-auto">
        {feedList?.map((item) => (
          <ArticleCard key={item.agent_id} article={item} />
        ))}
        {(loading || loadingMore) && <ListLoading />}
        <div>
          <FeedAsiade />
        </div>
      </div>
    </div>
  )
}

FeedPage.getLayout = (page: ReactNode) => (
  <PrimaryLayout disablePadding={true}>{page}</PrimaryLayout>
)

export default FeedPage
