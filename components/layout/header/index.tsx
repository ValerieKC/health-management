'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const handleDirectToLogin = () => {
    router.push('/auth?step=login')
  }
  const handleDirectToLanding = () => {
    router.push('/')
  }
  const handleDirectToProfile = () => {
    router.push('/profile')
  }
  return <div className="h-[100px] sticky top-0 z-50 w-full bg-background  p-8 shadow-[0px_0px_36px_-6px_#D57EEA] flex justify-between">
    <div className="text-primary font-bold text-size-7 cursor-pointer" onClick={handleDirectToLanding}>Health Sprint
    </div>
    {isAuthenticated ? <div className="text-primary cursor-pointer" onClick={handleDirectToProfile}>
      Profile
    </div> : <div className="text-primary cursor-pointer" onClick={handleDirectToLogin}>
      Log In
    </div>}
  </div>
}

export default Header
