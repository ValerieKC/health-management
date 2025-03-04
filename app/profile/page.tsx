'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { Input } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import DialogBodyInfoInput from './components/dialog-initial-body-info-input'
import HMText from '@/components/ui/HMText'
import UserBasicInfo from './components/user-basic-info'
import WeightChart from './components/weight-chart'
import { useUserInfoStore } from '@/store/useUserInfoStore'
import HMButton from '@/components/ui/HMButton'
import { db } from '@/lib/firebase'
import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore'
import DialogEditHeight from './components/dialog-edit-height'


const ProfilePage = () => {
  const { auth, isAuthenticated } = useAuthStore()
  const { userInfo } = useUserInfoStore()
  const userRef = useMemo(() => {
    return auth?.uid ? doc(db, 'users', auth.uid) : null
  }, [auth?.uid])
  const [isOpenDefaultInputDialog, setIsOpenDefaultInputDialog] = useState(false)
  const [isOpenEditHeightDialog, setIsOpenEditHeightDialog] = useState(false)
  const [weight, setWeight] = useState('')
  
  const [isDisabledInputBtn, setIsDisabledInputBtn] = useState(true)
  console.log(userInfo, isAuthenticated)
  useEffect(() => {
    if(!userInfo?.hasInputBasicInfo ) setIsOpenDefaultInputDialog(true)
    else setIsOpenDefaultInputDialog(false)
  },[userInfo?.hasInputBasicInfo, isAuthenticated])
  const checkIfDisabled = (inputDate: string) => {
    if(!inputDate) return
    // 取得今日 YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0]
    // 轉換成 YYYY-MM-DD
    const lastRecordDate = new Date(inputDate).toISOString().split('T')[0]
    // 若今日已有紀錄，則禁用按鈕
    setIsDisabledInputBtn(today === lastRecordDate) 
  }
  useEffect(() => {
    if(!userRef) return
    const getLatestWeight = async() => {
      const userDoc = await getDoc(userRef) 
      const records = userDoc.data()?.bodyRecords || []
      const latestRecord = records[records.length - 1]
      checkIfDisabled(latestRecord?.inputDate)
    }
    getLatestWeight()
  },[userRef])
  const handleEnterWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setWeight(value)
    }
  }
  const onSubmitWeight = async () => {
    if(!userRef) return
    try {

      const newBodyRecords = {
        weight: weight,
        bmi: userInfo.height && weight ? (Number(weight) / ((Number(userInfo.height) / 100) ** 2)).toFixed(2) : '',
        inputDate: new Date().toISOString(),
      }
      await setDoc(userRef, {
        bodyRecords: arrayUnion(newBodyRecords),
      }, { merge: true })
      setWeight('')
    } catch(error){
      console.error('Error updating user data:', error)
    }
  }
  const isDisabledUpdateHeightBtn = !userInfo.height
  return (
    <div className="w-[900px] mx-auto mt-16 max-lg:mt-8 flex gap-6">
      <DialogBodyInfoInput isOpen={isOpenDefaultInputDialog} setIsOpen={setIsOpenDefaultInputDialog} />
      <DialogEditHeight isOpen={isOpenEditHeightDialog} setIsOpen={setIsOpenEditHeightDialog} />
      <div className="w-[584px] bg-white p-6 rounded-2xl shadow-100 h-fit">
        <HMText level={4} fontWeight={700} className="mb-6">Weight Tracking</HMText>
        <div className="flex gap-2 items-center mb-4">
          <HMText level={2} fontWeight={600}>Height:</HMText>

          <HMText level={2}>{userInfo.height ? userInfo.height : '-'} cm</HMText>
          <HMButton theme="outline" onClick={() => setIsOpenEditHeightDialog(true)} className="text-size-1" disabled={isDisabledUpdateHeightBtn}>Edit</HMButton>
          {!userInfo?.hasInputBasicInfo&& <HMText level={1} fontWeight={600} className="underline cursor-pointer" color="text-primary-300" onClick={() => setIsOpenDefaultInputDialog(true)}>Complete basic information first</HMText>}
        </div>

        <div className="flex gap-2 items-center">
          <HMText level={2} fontWeight={600}>Enter Today&apos;s Weight(kg):</HMText>
          <Input variant="flushed" value={weight} onChange={handleEnterWeight} className='w-[100px] h-[34px]'/>
          <HMButton theme="primary" onClick={onSubmitWeight} disabled={isDisabledInputBtn} className="text-size-1">Save</HMButton>
        </div>
        <WeightChart auth={auth} userInfo={userInfo} />
      </div>
      <UserBasicInfo auth={auth} userInfo={userInfo} />

    </div>)
}

export default ProfilePage
