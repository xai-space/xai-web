import { FeedListItem } from '@/api/feed/types'
import { create } from 'zustand'

interface ArticleInfoStore {
  article: FeedListItem | undefined
  feedList: FeedListItem[]
  postsList: FeedListItem[]
  setFeedList: (feedList: FeedListItem[]) => void
  setPostsList: (postsList: FeedListItem[]) => void
  setArticle: (article: FeedListItem) => void
}

export const useArticleStore = create<ArticleInfoStore>((set, get) => ({
  article: undefined,
  feedList: [],
  postsList: [],
  setFeedList: (feedList) => set({ feedList }),
  setPostsList: (postsList) => set({ postsList }),
  setArticle: (article) => set({ article }),
}))
