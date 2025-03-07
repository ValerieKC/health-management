import HMText from '@/components/ui/HMText'
import { timestampConvertDate } from '@/lib/utils/helper'
import UserIcon from '@/public/user-solid.svg'
import { AuthData } from '@/store/useAuthStore'
import { UserInfo } from '@/store/useUserInfoStore'
import Image from 'next/image'

interface UserBasicInfoProps {
  auth: AuthData | null
  userInfo: UserInfo
}

const UserBasicInfo = ({auth}: UserBasicInfoProps) => {
  return (
    <div className="w-[292px] h-fit bg-white p-6 rounded-2xl shadow-100 max-lg:w-full">
      <div className="bg-[#EFECE8] rounded-full w-[100px] h-[100px] flex items-center justify-center mx-auto">
        <Image src={UserIcon} alt="User Icon" width={50} height={50} />
      </div>
      <div className="text-center mt-4 flex flex-col gap-2">
        <HMText level={3} fontWeight={700}>{auth?.name}</HMText>
        <HMText level={2}>{auth?.email}</HMText>
        <HMText level={2}>Join Time: {timestampConvertDate(auth?.joinedAt || '')}</HMText>
      </div>
    </div>  
  )
}
export default UserBasicInfo