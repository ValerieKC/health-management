'use client'

import { timestampConvertDate } from '@/lib/utils/helper'
import { useAuthStore } from '@/store/useAuthStore'
import UserIcon from '@/public/user-solid.svg'
import Image from 'next/image'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'
import DialogBodyInfoInput from './components/dialog-body-info-input'
import HMText from '@/components/ui/HMText'
const ProfilePage = () => {
  const { user } = useAuthStore()
  const {year, month, date} = timestampConvertDate(user?.joinedAt || '')
  const [isOpen, setIsOpen] = useState(false)
  const [weight, setWeight] = useState(0)
  return (
    <div className="w-[900px] mx-auto mt-16 max-lg:mt-8 flex gap-6">
      <DialogBodyInfoInput isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-[584px] bg-white p-6 rounded-2xl shadow-100">
        <HMText level={4} fontWeight={700}>體重紀錄</HMText>
      
        <Input variant="outline"placeholder="請輸入體重" value={weight} onChange={(e) => setWeight(Number(e.target.value))}/>
      </div>
      <div className="w-[292px] bg-white p-6 rounded-2xl shadow-100">
        <div className="bg-[#EFECE8] rounded-full w-[100px] h-[100px] flex items-center justify-center mx-auto">
          <Image src={UserIcon} alt="User Icon" width={50} height={50} />
        </div>
        <div className="text-center mt-4 flex flex-col gap-2">
          <HMText level={3} fontWeight={700}>{user?.name}</HMText>
          <HMText level={2}>{user?.email}</HMText>
          <HMText level={2}>Join Time: {`${year}/${month}/${date}`}</HMText>
        </div>
      </div>

    </div>)
}

export default ProfilePage
