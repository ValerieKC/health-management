import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User as FirebaseUser } from 'firebase/auth'

export type AuthData = {
  uid: string;
  name: string;
  email: string;
  joinedAt: string;
}

type AuthState = {
  auth: AuthData | null;
  isAuthenticated: boolean;
  setUserAuth: (firebaseUser: FirebaseUser) => void;
  clearUserAuth: () => void;
  updateUserAuth: (updates: Partial<AuthData>) => void;
}
export const transformFirebaseUser = (firebaseUser: FirebaseUser): AuthData => ({
  uid: firebaseUser.uid,
  name: firebaseUser.displayName || '',
  email: firebaseUser.email || '',
  joinedAt: firebaseUser.metadata.creationTime || '',
})
export const useAuthStore = create<AuthState>()(persist((set) => ({
  auth: null,
  isAuthenticated: false,
  setUserAuth: (firebaseUser: FirebaseUser) => 
    set({ 
      auth: transformFirebaseUser(firebaseUser), 
      isAuthenticated: true,
    }),
  clearUserAuth: () => 
    set({ 
      auth: null, 
      isAuthenticated: false,
    }),
  updateUserAuth: (updates: Partial<AuthData>) =>
    set((state) => ({
      auth: state.auth 
        ? { ...state.auth, ...updates }
        : null
    })),
}), {
  name: 'auth',
  storage: createJSONStorage(() => localStorage),
}))
