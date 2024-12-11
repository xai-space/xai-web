import { AgentInfoResDataBase, AgentSessionsList } from '@/api/ai/type'
import { FeedListRes } from '@/api/feed/types'
import { create } from 'zustand'

interface ArticleInfoStore {
    article: FeedListRes | undefined
    feedList: FeedListRes[]

    setFeedList: (feedList: FeedListRes[]) => void
    setArticle: (article: FeedListRes) => void
}

export const useArticleStore = create<ArticleInfoStore>((set, get) => ({
    article: undefined,
    feedList: [],

    setFeedList: (feedList) => set({ feedList }),
    setArticle: (article) => set({ article })
}))
