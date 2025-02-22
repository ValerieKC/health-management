import { Button, Stack } from '@chakra-ui/react'
import { HStack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@/components/ui/radio'

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import HMText from '@/components/ui/HMText'
import HMButton from '@/components/ui/HMButton'

interface DialogBodyInfoInputProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
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

const DialogBodyInfoInput = ({isOpen, setIsOpen}: DialogBodyInfoInputProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({defaultValues})

  register('birth')
  const birth = watch('birth')
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setValue('birth', e.target.value)
  }
  register('gender')
  const gender = watch('gender')
  const handleGenderChange = (e: { value: 'male' | 'female' }) => {
    setValue('gender', e.value)
  }
  register('height')
  const height = watch('height')
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('height', e.target.value.replace(/^(\d+)(\.\d{0,1})?.*$/, '$1$2'))
  }
  register('weight')
  const weight = watch('weight')
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('weight', e.target.value.replace(/^(\d+)(\.\d{0,1})?.*$/, '$1$2'))
  }
  console.log({birth, gender, height, weight})
  return (
    <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      {/* <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </DialogTrigger> */}
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
            <HMButton theme="primary">Cancel</HMButton>
          </DialogActionTrigger>
          <HMButton theme="outline">Save</HMButton>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
export default DialogBodyInfoInput