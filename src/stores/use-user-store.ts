import { create } from 'zustand'

import type { UserInfoRes } from '@/api/user/types'

interface UserStore {
  userInfo: UserInfoRes | null
  oldUserInfo: UserInfoRes | null

  /** Is also `userInfo` */

  setUserInfo: (userInfo: UserStore['userInfo']) => void
}

export const useUserStore = create<UserStore>((set, get) => ({
  userInfo: null,
  oldUserInfo: null,

  setUserInfo: (userInfo) => set({ userInfo, oldUserInfo: get().userInfo }),
}))
