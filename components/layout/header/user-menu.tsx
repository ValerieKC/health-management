import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/useAuthStore'
import { useUserInfoStore } from '@/store/useUserInfoStore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const UserMenu = () => {
  const router = useRouter()
  const handleDirectToProfile = () => {
    router.push('/profile')
  }
  const { clearUserAuth } = useAuthStore()
  const { clearUserInfo } = useUserInfoStore()
  const logout = () => {
    clearUserAuth()
    clearUserInfo()
  }
  const handleLogout = async () => {
    try {
      await signOut(auth)
      logout()
      router.push('/')
    } catch (error) {
      console.error('登出失敗：', error)
    }
  }
  return <div className="flex gap-3 items-center">
    <div className="text-primary cursor-pointer" onClick={handleLogout}>Log out</div>
    <div className="text-primary cursor-pointer" onClick={handleDirectToProfile}>
  Profile
    </div>
  </div>
}
export default UserMenu
