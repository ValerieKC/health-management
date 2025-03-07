import HMText from '@/components/ui/HMText'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { HStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
interface FormValues {
  gender: 'male' | 'female'
  age: string
  weight: string
  height: string
}
const defaultValues: FormValues = {
  gender: 'male',
  age: '',
  weight: '',
  height: '',
}
interface CalculatorProps {
  bmrResult: string
  setBmrResult: Dispatch<SetStateAction<string>>
  setShouldShowTdee: Dispatch<SetStateAction<boolean>>
}
const Calculator = ({ bmrResult, setBmrResult, setShouldShowTdee }: CalculatorProps) => {
  const {
    register,
    watch,
    setValue,
  } = useForm<FormValues>({defaultValues})

  register('gender')
  const gender = watch('gender')
  const handleGenderChange = (e: {value: 'male' | 'female'}) => {
    setValue('gender', e.value)
  }
  register('age')
  const age = watch('age')
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value 
    if (/^\d*$/.test(value)) { // 只允許 0-9 數字
      setValue('age', value)
    }
  }
  register('weight')
  const weight = watch('weight')
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setValue('weight', value)
    }
  }
  register('height')
  const height = watch('height')
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setValue('height', value)
    }
  }
  useEffect(() => {
    if(gender === 'male') {
      const maleBmr = (13.7 * Number(weight) + 5 * Number(height) - 6.8 * Number(age) + 66).toFixed(0)
      setBmrResult(maleBmr)
    }else{ 
      const femaleBmr =  (9.6 * Number(weight) + 1.8 * Number(height) - 4.7 * Number(age) + 655).toFixed(0)
      setBmrResult(femaleBmr)}
  }, [weight, height, age, gender, setBmrResult])
  
  const isDisplayBmr = useMemo(() => {
    return weight.length > 0 && height.length > 0 && age.length > 0 && (Number(bmrResult) > 0) && Number(weight) > 0 && Number(height) > 0 && Number(age) > 0
  }, [weight, height, age, bmrResult])
  const errorMessage = useMemo(() => {
    if ((weight.length > 0 && Number(weight) === 0) || (height.length > 0 && Number(height) === 0) || (age.length > 0 && Number(age) === 0)) return 'The input must be a number greater than 0.'
    return ''
  }, [weight, height, age])
  useEffect(() => {
    setShouldShowTdee(isDisplayBmr)
  }, [isDisplayBmr, setShouldShowTdee])
  console.log(isDisplayBmr)
  
  console.log({weight, height, age, bmrResult})
  return (
    <div className="w-[300px] max-lg:w-full max-lg:max-w-[720px] max-lg:min-w-[373px] border-[3px] border-primary-700 p-6 rounded-xl flex flex-col mx-auto">
      <HMText level={5} fontWeight={600}>TDEE Calculator</HMText>
      <HMText level={1} className="my-6">
          TDEE (Total Daily Energy Expenditure) is the total amount of calories your body burns in a day, including basal metabolic rate (BMR), physical activity, and the thermic effect of food. Different lifestyles require different amounts of energy. When your daily calorie intake matches your TDEE, you achieve &quot;caloric balance.&quot;
      </HMText>
      <div className="flex flex-col gap-4">
          
        {/* 性別 */}
        <div className="flex items-center">
          <HMText level={2}className="w-[40%]" fontWeight="600" >Gender</HMText>
          <RadioGroup value={gender} onValueChange={handleGenderChange} className="w-[60%]">
            <HStack>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </HStack>
          </RadioGroup>
        </div>
        {/* 年齡 */}
        <div className="flex items-center">
          <HMText level={2}className="w-[40%]" fontWeight="600">Age</HMText>
          <input type="text" value={age} onChange={handleAgeChange} className='w-[60%]' />
        </div>
        {/* 體重 */}
        <div className="flex items-center">
          <HMText level={2}className="w-[40%]" fontWeight="600">Weight(kg)</HMText>
          <input type="text" value={weight} onChange={handleWeightChange} className='w-[60%]' />
        </div>
        {/* 身高 */}
        <div className="flex items-center">
          <HMText level={2}className="w-[40%]" fontWeight="600">Height(cm)</HMText>
          <input type="text" value={height} onChange={handleHeightChange} className='w-[60%]' />
        </div>
      </div>
      {errorMessage && <HMText level={2} color="text-warning" className="mt-2">{errorMessage}</HMText>}
      <div className="bg-primary-700 p-3 flex items-center justify-between rounded-lg h-[48px] mt-auto max-lg:mt-5">
        <HMText level={2}>BMR Result:</HMText>
        <div className="bg-white w-[100px] h-full flex items-center justify-center">
          <HMText level={2} className="text-center">{isDisplayBmr ? bmrResult : ''}</HMText>
        </div>
      </div>
    </div>
  )
}
export default Calculator