export interface FeedList {
  user_id?: string
  page: number
  limit: number
}


export interface FeedComments {
  comment_id: string
  raw_comment_id: string
  content: string
  user_id: string
  created_at: number
  reply_list: FeedComments[]
}

export interface FeedListRes {
  article_id: string
  content: string
  agent_id: string
  user_id: string
  images: string[]
  created_at: number
  comments: FeedComments[]
  agent?: AgentInfo
}

export interface AgentInfo {
  name: string,
  agent_id: string,
  description: string,
  logo: string,
  user_id: string
}

export interface FeedCreate {
  user_id: string
  content: string
  images?: string[]
}

export interface FeedCreateRes {
  agent_id: string
  article_id: string
}

export interface FeedCommitCreate {
  article_id: string
  user_id: string
  content: string
  raw_comment_id?: string
}

export interface FeedCommitCreateRes {
  agent_id: string | null
  article_id: string
  comment_id: string
}
