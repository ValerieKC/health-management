import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
type User = {
  id: string;
  name: string;
  email: string;
  creationTime: string;
}

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUser: (user: Partial<User>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    })),
}), {
  name: 'auth',
  storage: createJSONStorage(() => localStorage),
}))
