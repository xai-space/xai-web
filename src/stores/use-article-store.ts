import { FeedListItem } from '@/api/feed/types'
import { create } from 'zustand'

interface ArticleInfoStore {
  article: FeedListItem | undefined
  feedList: FeedListItem[]
  postsList: FeedListItem[]
  statusCode: number, // 200, 404, 500
  setFeedList: (feedList: FeedListItem[]) => void
  setPostsList: (postsList: FeedListItem[]) => void
  setArticle: (article: FeedListItem) => void
  setStatusCode: (statusCode: number) => void
}

export const useArticleStore = create<ArticleInfoStore>((set, get) => ({
  article: undefined,
  feedList: [],
  postsList: [],
  statusCode: 200,
  setFeedList: (feedList) => set({ feedList }),
  setPostsList: (postsList) => set({ postsList }),
  setArticle: (article) => set({ article }),
  setStatusCode: (statusCode: number) => set({ statusCode })
}))
