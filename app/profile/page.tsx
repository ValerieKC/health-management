'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { Input } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)
  const userRef = useMemo(() => {
    return auth?.uid ? doc(db, 'users', auth.uid) : null
  }, [auth?.uid])
  const [isOpenDefaultInputDialog, setIsOpenDefaultInputDialog] = useState(false)
  const [isOpenEditHeightDialog, setIsOpenEditHeightDialog] = useState(false)
  const [weight, setWeight] = useState('')
  const [latestUpdateWeightDate, setLatestUpdateWeightDate] = useState('')
  useEffect(() => {
    if(isAuthenticated && !userInfo?.hasInputBasicInfo ) setIsOpenDefaultInputDialog(true)
    else setIsOpenDefaultInputDialog(false)
  },[userInfo?.hasInputBasicInfo, isAuthenticated])

  const updateWeightData = useCallback(async () => {
    if (!auth?.uid || !userRef) return
    const userDocSnap = await getDoc(userRef)
    const userData = userDocSnap.data()
    const bodyRecords = userData?.bodyRecords || []
    const latestRecord = bodyRecords[bodyRecords.length - 1]
    setWeightRecords(bodyRecords)
    setLatestUpdateWeightDate(latestRecord?.inputDate)
  }, [auth?.uid, userRef])
  useEffect(() => {
    updateWeightData()
  },[updateWeightData])
  const isDisabledEnterWeight = useMemo(() => {
    if(!latestUpdateWeightDate) return true
    // 取得今日 YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0]
    // 轉換成 YYYY-MM-DD
    const lastRecordDate = new Date(latestUpdateWeightDate).toISOString().split('T')[0]
    // 若今日已有紀錄，則禁用按鈕
    return today === lastRecordDate
  },[latestUpdateWeightDate])


  const handleEnterWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setWeight(value)
    }
  }
  
  const onSubmitWeight = async () => {
    if(!userRef) return
    setIsLoading(true)
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
      await updateWeightData()
      // await getLatestWeight()
    } catch(error){
      console.error('Error updating user data:', error)
    }
    setIsLoading(false)
  }
  const isDisabledUpdateHeightBtn = !userInfo.height

  const [weightRecords, setWeightRecords] = useState<Common.Body.WeightRecords[]>([])
  useEffect(() => {
    updateWeightData()
  },[updateWeightData])
  return (
    <div className="mx-auto mt-16 max-lg:mt-8 flex justify-center gap-6 max-lg:flex-col-reverse max-lg:px-4">
      <DialogBodyInfoInput isOpen={isOpenDefaultInputDialog} setIsOpen={setIsOpenDefaultInputDialog} updateWeightData={updateWeightData} />
      <DialogEditHeight isOpen={isOpenEditHeightDialog} setIsOpen={setIsOpenEditHeightDialog} />
      <div className="w-[584px] max-lg:w-full max-lg:min-w-[373px] bg-white p-6 rounded-2xl shadow-100 h-fit">
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
          <HMButton theme="primary" onClick={onSubmitWeight} disabled={isDisabledEnterWeight} className="text-size-1" isLoading={isLoading}>Save</HMButton>
        </div>
        <WeightChart weightRecords={weightRecords} />
      </div>
      <UserBasicInfo auth={auth} userInfo={userInfo} />

    </div>)
}

export default ProfilePage
