import { qs } from '@/utils/qs'
import { api } from '..'
import { ApiResponse } from '../types'
import {
  FeedCommitCreate,
  FeedCommitCreateRes,
  FeedCreate,
  FeedCreateRes,
  FeedList,
  FeedListRes,
} from './types'

export const feedApi = {
  getList: (query: FeedList) => {
    return api.GET<ApiResponse<FeedListRes[]>>(
      '/agent/v1/playground/article/list' + qs.stringify(query)
    )
  },

  getDetail: (id: string) => {
    return api.GET<ApiResponse<FeedListRes>>(
      `/agent/v1/playground/article/detail/${id}`
    )
  },

  createFeed: async (data: FeedCreate) => {
    return api.POST<ApiResponse<FeedCreateRes>>(
      '/agent/v1/playground/article/publish',
      {
        body: data,
      }
    )
  },

  createComment: async (data: FeedCommitCreate) => {
    return api.POST<ApiResponse<FeedCommitCreateRes>>(
      '/agent/v1/playground/article/comment/commit',
      {
        body: data,
      }
    )
  },
}
