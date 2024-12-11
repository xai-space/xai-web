
import { aiApi } from '@/api/ai'
import { AgentChat, AgentChatRes } from '@/api/ai/type'
import type { ApiResponse } from '@/api/types'
import { useMutation } from '@tanstack/react-query'

export function useChat() {
  return useMutation<ApiResponse<AgentChatRes>, Error, AgentChat>({
    mutationFn: async (data) => aiApi.chat(data),
  })
}
