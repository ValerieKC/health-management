import { DialogCloseTrigger, Stack } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/components/ui/radio'

import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import HMText from '@/components/ui/HMText'
import HMButton from '@/components/ui/HMButton'
import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuthStore } from '@/store/useAuthStore'
import { useUserInfoStore } from '@/store/useUserInfoStore'

interface DialogBodyInfoInputProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  updateWeightData: () => Promise<void>
}
interface FormValues {
  birth: string
  gender: 'male' | 'female'
  height: string
  weight: string
}
const defaultValues: FormValues = {
  birth: '',
  gender: 'male',
  height: '',
  weight: '',
}
interface UserRecords {
  birth: string
  gender: 'male' | 'female'
  bodyRecords?: Common.Body.WeightRecords
  hasInputBasicInfo?: boolean
  height: string
}
const DialogBodyInfoInput = ({isOpen, setIsOpen,updateWeightData}: DialogBodyInfoInputProps) => {
  const { setUserInfo } = useUserInfoStore()
  const { auth } = useAuthStore()
  const {
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm<FormValues>({defaultValues})
  const [isLoading, setIsLoading] = useState(false)
  register('birth')
  const birth = watch('birth')
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('birth', e.target.value)
  }
  register('gender')
  const gender = watch('gender')
  const handleGenderChange = (e: { value: 'male' | 'female' }) => {
    setValue('gender', e.value)
  }
  register('height', {required: true})
  const height = watch('height')
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setValue('height', value)
    }
  }
  register('weight', {required: true})
  const weight = watch('weight')
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setValue('weight', value)
    }
  }

  const onSubmit = async (data: FormValues) => {
    if(!auth?.uid) return
    setIsLoading(true)
    try {
      const userRef = doc(db, 'users', auth?.uid)
      const userData: UserRecords = {      
        birth: data.birth,
        gender: data.gender,
        height: data.height,
      }

      // 添加身高體重記錄
      const newBodyRecords = {
        weight: data.weight,
        bmi: data.height && data.weight ? (Number(data.weight) / ((Number(data.height) / 100) ** 2)).toFixed(2) : '',
        inputDate: new Date().toISOString(),
      }
      userData.hasInputBasicInfo = true
      await setDoc(userRef, {
        ...userData,
        bodyRecords: arrayUnion(newBodyRecords),
      }, { merge: true })
      await updateWeightData()
      setUserInfo({gender: data.gender, birth: data.birth, height: data.height, hasInputBasicInfo: true})
      
      setIsOpen(false)
      setIsLoading(false)
    } catch (error) {
      console.error('Error updating user data:', error)
      setIsLoading(false)
    }
  }
  const isDisabled = useMemo(() => {return !birth || !Number(height) || !Number(weight)}, [birth, height, weight])
  return (
    <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-size-3 font-bold'>Complete Your Body Data</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="4">
            <div>
              <HMText level={2} className="mb-2" fontWeight="600">Birth</HMText>
              <input 
                type="date" 
                value={birth} 
                onChange={handleBirthChange} 
                className='w-full border-b-[1px] px-2 py-1 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:dark:invert-0' 
              />
            </div>
            <div>
              <HMText level={2}className="mb-2" fontWeight="600">Gender</HMText>
              <RadioGroup value={gender} onValueChange={handleGenderChange}>
                <HStack gap="6">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </HStack>
              </RadioGroup>
            </div>
            <div>
              <HMText level={2}className="mb-2" fontWeight="600">Height(cm)</HMText>
              <input type="text" value={height} onChange={handleHeightChange} className='w-full' />
            </div>
            <div>
              <HMText level={2}className="mb-2" fontWeight="600">Weight(kg)</HMText>
              <input type="text" value={weight} onChange={handleWeightChange} className='w-full' />
            </div>
            
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <HMButton theme="primary" onClick={handleSubmit(onSubmit)} disabled={isDisabled} isLoading={isLoading}>Save</HMButton>
          </DialogActionTrigger>
          <HMButton theme="outline" onClick={() => setIsOpen(false)}>Cancel</HMButton>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
export default DialogBodyInfoInput