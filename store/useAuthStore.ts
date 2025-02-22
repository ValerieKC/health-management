import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User as FirebaseUser } from 'firebase/auth'

type User = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  gender?: 'male' | 'female';
  height?: string;
  weight?: string;
  birth?: string;
}

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (firebaseUser: FirebaseUser) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
}
const transformFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName || '',
  email: firebaseUser.email || '',
  joinedAt: firebaseUser.metadata.creationTime || '',
})
export const useAuthStore = create<AuthState>()(persist((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (firebaseUser: FirebaseUser) => 
    set({ 
      user: transformFirebaseUser(firebaseUser), 
      isAuthenticated: true 
    }),
  clearUser: () => 
    set({ 
      user: null, 
      isAuthenticated: false 
    }),
  updateUser: (updates: Partial<User>) =>
    set((state) => ({
      user: state.user 
        ? { ...state.user, ...updates }
        : null
    })),
}), {
  name: 'auth',
  storage: createJSONStorage(() => localStorage),
}))
