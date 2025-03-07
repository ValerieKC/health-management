import { useMemo } from 'react'
import ActivityImg0 from '@/public/activity-0.png' 
import ActivityImg1 from '@/public/activity-1.png' 
import ActivityImg2 from '@/public/activity-2.png' 
import ActivityImg3 from '@/public/activity-3.png' 
import ActivityImg4 from '@/public/activity-4.png'
import ActivityCard from '../activity-card'
import HMText from '@/components/ui/HMText'
import { useAuthStore } from '@/store/useAuthStore'
import HMButton from '@/components/ui/HMButton'
import { useRouter } from 'next/navigation'
interface TdeePanelProps {
  bmrResult: string
  shouldShowTdee: boolean
}
const TdeePanel = ({ bmrResult, shouldShowTdee }:TdeePanelProps) => {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  
  const redirectToProfile = () => {
    router.push('/profile')
  }
  const redirectToSignUp = () => {
    router.push('/auth?step=signup')
  }
  const activityList = useMemo(() => {
    return [
      {
        key:'noActivity',
        figure: ActivityImg0,
        title: 'No Activity',
        note: 'Little to no exercise, mostly sitting',
        activityFactor: 1.2,
        tdee: (1.2 * Number(bmrResult)).toFixed(0),
      },
      {
        key:'lightActivity',
        figure: ActivityImg1,
        title: 'Light Activity',
        note: 'Exercise 1-3 days per week',
        activityFactor: 1.375,
        tdee: (1.375 * Number(bmrResult)).toFixed(0),
      },      {
        key:'moderateActivity',
        figure: ActivityImg2,
        title: 'Moderate Activity',
        note: 'Frequent walking/standing, exercise 3-5 days per week',
        activityFactor: 1.55,
        tdee: (1.55 * Number(bmrResult)).toFixed(0),
      },      {
        key:'highActivity',
        figure: ActivityImg3,
        title: 'High Activity',
        note: 'Mostly standing/walking, exercise 6-7 days per week',
        activityFactor: 1.725,
        tdee: (1.725 * Number(bmrResult)).toFixed(0),
      },      {
        key:'veryHighActivity',
        figure: ActivityImg4,
        title: 'Very High Activity',
        note: 'Engaged in intense physical activity all day, such as construction workers or heavy labor jobs',
        activityFactor: 1.9,
        tdee: (1.9 * Number(bmrResult)).toFixed(0),
      },
    ]
  }, [bmrResult])
  return (<div className="flex flex-wrap gap-2 w-[676px] max-lg:w-full max-lg:max-w-[720px] max-lg:min-w-[373px] mx-auto">
    {activityList.map((item) => {
      return (
        <ActivityCard key={item.key} figure={item.figure} title={item.title} note={item.note} activityFactor={item.activityFactor} tdee={item.tdee} shouldShowTdee={shouldShowTdee} />
      )
    })}
    <div className="w-[calc((100%-16px)/3)] max-lg:w-[calc((100%-16px)/2)] p-4 flex flex-col justify-center">
      <HMText level={1} className="text-center">Want to manage your weight more effectively?</HMText> {isAuthenticated ? <HMButton theme="outline" className="mt-4 w-fit mx-auto text-size-1" onClick={redirectToProfile}>Go to your profile</HMButton>: <HMButton theme="outline" className="mt-4 w-fit mx-auto text-size-1" onClick={redirectToSignUp}>Join us!</HMButton>}
    </div>
  </div>)
}
export default TdeePanel