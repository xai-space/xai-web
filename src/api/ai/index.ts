import { qs } from '@/utils/qs'
import { api } from '..'
import { ApiResponse } from '../types'
import {
  AIEMemePosterData,
  AIMemeInfo,
  AIMemeInfoQuery,
  AIMemePosterQuery,
  AgentInfoResDataBase,
  AgentResDataBase,
  AgentSessionsList,
} from './type'

import {
  AgentChat,
  AgentChatRes,
  AgentCreate,
  AgentCreateRes,
  AgentListReq,
  AgentListResItem,
  AgentSessionsAll,
  AgentSessionsAllRes,
  AgentSessionsDelete,
  AgentSessionsDeleteRes,
  AgentSessionsHistory,
  AgentSessionsHistoryRes,
  AgentSessionsRename,
  AgentSessionsRenameRes,
  AgentUpadeRes,
  AgentUpdate,
} from './type'
import { CommonHeaders, ContentType } from '@/hooks/use-fetch'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { defaultUserId } from '@/config/base'

export const aiApi = {
  getMemeInfo: async (data?: AIMemeInfoQuery, signal?: AbortSignal) => {
    return api.POST<ApiResponse<AIMemeInfo>>('/ai/meme-info', {
      body: data,
      signal: signal,
    })
  },

  getMemeImage: async (data?: AIMemeInfo, signal?: AbortSignal) => {
    return api.POST<ApiResponse<{ images: string[] }>>('/ai/meme-logo', {
      body: data,
      signal: signal,
    })
  },

  getMemePoster: async (data?: AIMemePosterQuery, signal?: AbortSignal) => {
    return api.POST<ApiResponse<AIEMemePosterData>>('/ai/meme-poster', {
      body: data,
      signal: signal,
    })
  },

  uploadImage: (formData: FormData) => {
    return api.POST<ApiResponse<{ filename: string; url: string }>>(
      '/v1/playground/upload',
      {
        body: formData,
        headers: {
          [CommonHeaders.ContentType]: ContentType.FormData,
        },
      }
    )
  },

  createAgent: async (data: AgentCreate) => {
    return api.POST<ApiResponse<AgentResDataBase>>(
      '/v1/playground/agent/create',
      {
        body: data,
      }
    )
  },

  updateAgent: async (data: AgentCreate) => {
    return api.PUT<ApiResponse<AgentResDataBase>>(
      '/v1/playground/agent/update',
      {
        body: data,
      }
    )
  },

  deleteAgent: async (agentId: string) => {
    return api.POST<ApiResponse>('/v1/playground/agent/delete', {
      body: {
        agent_id: agentId,
      }
    })
  },

  getAgentInfo: async (agentId: string) => {
    return api.GET<ApiResponse<AgentInfoResDataBase>>(
      `/v1/playground/agent/${agentId}`,
    )
  },

  getAgentList: (query: AgentListReq) => {
    return api.GET<ApiResponse<AgentInfoResDataBase[]>>(
      '/v1/playground/agent/list' + qs.stringify(query)
    )
  },

  chat: async (data: AgentChat) => {
    // return fetchEventSource('/v1/playground/agent/chat', {

    // })

    // return api.EVENTSOURCE<ApiResponse<AgentChatRes>>(
    //   '/v1/playground/agent/chat',
    //   {
    //     body: data,
    //   }
    // )
  },

  getAllSession: async (data: AgentSessionsAll) => {
    return api.POST<ApiResponse<AgentSessionsAllRes[]>>(
      '/v1/playground/agent/sessions/all',
      {
        body: data,
      }
    )
  },

  sessionReName: async (data: AgentSessionsRename) => {
    return api.POST<ApiResponse<AgentSessionsRenameRes>>(
      '/v1/playground/agent/session/rename',
      {
        body: data,
      }
    )
  },

  getSessionHistory: async (data: AgentSessionsHistory, session_id: string) => {
    return api.POST<ApiResponse<AgentSessionsHistoryRes>>(
      `/v1/playground/agent/sessions/${session_id}`,
      {
        body: data,
      }
    )
  },

  getSessionList: async (agentId: string, page = 1, limit = 10) => {
    return api.POST<ApiResponse<AgentSessionsList[]>>(
      `/v1/playground/agent/sessions/all?page=${page}&limit=${limit}`,
      {
        body: {
          agent_id: agentId,
        },
      }
    )
  },

  deleteSession: async (data: AgentSessionsDelete) => {
    return api.POST<ApiResponse<AgentSessionsDeleteRes>>(
      `/v1/playground/agent/session/delete`,
      {
        body: data,
      }
    )
  },
}
