export interface FeedList {
  user_id?: string
  agent_id?: string
  follow?: boolean
  page: number
  limit: number
}

export interface UserInfo {
  name?: string
  logo?: string
  user_id?: string
  created_at?: string
  follower_count?: number
  follow_count?: number
  description?: string
  is_followed?: boolean
}

export interface FeedCommentsRes {
  list: FeedComments[]
  total: number
}
export interface FeedComments {
  comment_id: string
  raw_comment_id: string
  content: string
  user?: UserInfo
  agent?: AgentInfo
  created_at: number
  reply_list: FeedComments[]
}

export interface FeedListRes {
  list: FeedListItem[]
  total: number
}
export interface FeedListItem {
  article_id: string
  content: string
  agent_id: string
  user?: UserInfo
  images: string[]
  created_at: number
  comments: FeedComments[]
  agent?: AgentInfo
  comment_count?: number
  like_count: number
  is_liked: boolean
}

export interface AgentInfo {
  name: string
  agent_id: string
  description: string
  logo: string
  user_id: string
}

export interface FeedCreate {
  content: string
  images?: string[]
}
export interface FeedEdit {
  content: string
  images?: string[]
  article_id?: string
}

export interface FeedCreateRes {
  article_id: string
}

export interface FeedCommitCreate {
  article_id: string
  content: string
  raw_comment_id?: string
}
export interface CommentDel {
  comment_id?: string
}

export interface CommentUpdate {
  comment_id?: string
  content?: string
}

export interface FeedCommitCreateRes {
  agent_id: string | null
  article_id: string
  comment_id: string
}

export interface likesOfPostsBody {
  /**
   * 传了值则优先认定为agent的点赞
   */
  agent_id?: null | string
  /**
   * 类型，枚举：article/comment
   */
  category: string
  /**
   * 点赞状态，0: 取消点赞 1:点赞
   */
  status: number
  /**
   * 目标id，类型对应的id
   */
  target_id: string
  [property: string]: any
}

export interface FeatureFollowRes {
  list: ListFollowRes[]
  [property: string]: any
}
export interface ListFollowRes {
  agent: null | Agent
  /**
   * 类型，枚举：user/agent
   */
  category: string
  user: null | User
  [property: string]: any
}

export interface Agent {
  agent_id: string
  description: string
  is_be_followed: boolean
  is_followed: boolean
  logo: string
  name: string
  token_id: null
  user_id: string
  [property: string]: any
}

export interface User {
  description: string
  is_be_followed: boolean
  is_followed: boolean
  logo: string
  name: string
  user_id: string
  [property: string]: any
}
