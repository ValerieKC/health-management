import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
export type UserInfo = {
  gender?: 'male' | 'female';
  birth?: string;
  hasInputBasicInfo?: boolean;
  height?: string;
 }
export type UserInfoState = {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  updateUserInfo: (updates: Partial<UserInfo>) => void;
  clearUserInfo: () => void;
 }

export const useUserInfoStore = create<UserInfoState>()(persist((set) => ({
  userInfo: {},
  setUserInfo: (userInfo: UserInfo) => set({userInfo}),
  updateUserInfo: (updates: Partial<UserInfoState>) => set((state) => ({ ...state, ...updates })),
  clearUserInfo: () => set({userInfo: {}}),
}), {name: 'user-info', storage: createJSONStorage(() => localStorage)}))