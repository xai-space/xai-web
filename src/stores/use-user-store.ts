import { create } from 'zustand'

import type { UserInfoRes } from '@/api/user/types'

interface UserStore {
  userInfo: UserInfoRes | null
  oldUserInfo: UserInfoRes | null

  otherUserInfo: UserInfoRes | null

  /** Is also `userInfo` */

  setUserInfo: (userInfo: UserStore['userInfo']) => void
  setOtherUserInfo: (userInfo: UserStore['otherUserInfo']) => void
}

export const useUserStore = create<UserStore>((set, get) => ({
  userInfo: null,
  oldUserInfo: null,
  otherUserInfo: null,
  setUserInfo: (userInfo) => set({ userInfo, oldUserInfo: get().userInfo }),
  setOtherUserInfo: (userInfo) => set({ otherUserInfo: userInfo }),
}))
