import HMText from '@/components/ui/HMText'
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
  return <div className="flex gap-4 items-center">
    <HMText level={3}color="text-primary" className="cursor-pointer" onClick={handleDirectToProfile}>
  Profile
    </HMText>
    <HMText level={3} color="text-primary" className="cursor-pointer" onClick={handleLogout}>Log out</HMText>
  </div>
}
export default UserMenu
