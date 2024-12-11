import { AgentInfoResDataBase, AgentSessionsList } from '@/api/ai/type'
import { create } from 'zustand'

interface ChatStore {
  sessionId: string
  sessionList: AgentSessionsList[]
  agentInfo: AgentInfoResDataBase | undefined

  setAgentInfo: (agentInfo?: AgentInfoResDataBase) => void
  setSessionId: (id: string) => void
  setSessionList: (list: AgentSessionsList[]) => void
}

export const useAIAgentStore = create<ChatStore>((set, get) => ({
  sessionList: [],
  sessionId: "",
  agentInfo: undefined,
  setAgentInfo: (agentInfo) => set({ agentInfo }),
  setSessionId: (sessionId) => set({ sessionId }),
  setSessionList: (sessionList) => set({ sessionList }),
}))
