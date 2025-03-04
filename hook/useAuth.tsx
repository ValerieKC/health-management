import { useAuthStore } from '../store/useAuthStore'
import { useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const { setUserAuth, clearUserAuth } = useAuthStore() // 使用新的方法名稱

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      setUserAuth(user)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      setUserAuth(user)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      await firebaseSignOut(auth)
      clearUserAuth()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    signIn,
    register,
    signOut,
  }
}