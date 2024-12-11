import { useMutation } from '@tanstack/react-query'
import { aiApi } from '@/api/ai'

import { ApiResponse } from '@/api/types'
import { AgentSessionsHistory, AgentSessionsHistoryRes } from '@/api/ai/type';

export function useSessionHistory() {
  return useMutation<
    ApiResponse<AgentSessionsHistoryRes>,
    Error,
    { data: AgentSessionsHistory; session_id: string }
  >({
    mutationFn: async ({ data, session_id }) =>
      aiApi.getSessionHistory(data, session_id),
  })
}
