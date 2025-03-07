'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import UserMenu from './user-menu'
import HMText from '@/components/ui/HMText'

const Header = () => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const handleDirectToLogin = () => {
    router.push('/auth?step=login')
  }
  const handleDirectToLanding = () => {
    router.push('/')
  }
  const handleDirectToTdee = () => {
    router.push('/tdee')
  }
  return <div className="h-[100px] sticky top-0 z-50 w-full bg-background  px-8 shadow-[0px_0px_36px_-6px_#D57EEA] flex justify-between items-center">
    <div className="text-primary font-bold text-size-7 max-lg:text-size-5 cursor-pointer" onClick={handleDirectToLanding}>Health Sprint
    </div>
    <div className="flex gap-4 items-center">
      <div className="text-primary cursor-pointer text-center" onClick={handleDirectToTdee}>TDEE<br />Calculator</div>
      {isAuthenticated ? <UserMenu /> : <HMText level={3} color="text-primary" className="cursor-pointer" onClick={handleDirectToLogin}>
      Log In
      </HMText>
      }
    </div>
  </div>
}

export default Header
