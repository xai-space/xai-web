import { aiApi } from '@/api/ai'
import { AgentCreate, AgentCreateRes } from '@/api/ai/type'
import type { ApiResponse } from '@/api/types'
import { useMutation } from '@tanstack/react-query'

export function useCreateAgent() {
  return useMutation<ApiResponse<AgentCreateRes>, Error, AgentCreate>({
    mutationFn: async (data) => aiApi.createAgent(data),
  })
}
