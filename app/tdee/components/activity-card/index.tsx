
import HMText from '@/components/ui/HMText'
import Image, { StaticImageData } from 'next/image'

interface ActivityProps {
  figure: StaticImageData
  title: string
  note: string
  activityFactor: number
  tdee: string
  shouldShowTdee: boolean
}
const ActivityCard = ({figure, title, note, activityFactor, tdee, shouldShowTdee}:ActivityProps) => {
  return (
    <div className="p-3 border-[2px] border-primary-600 rounded-xl w-[calc((100%-16px)/3)] h-[270px] flex flex-col max-lg:w-[calc((100%-16px)/2)]">
      <Image src={figure} alt="" className="mx-auto" />
      <HMText level={2} fontWeight="600" className="my-2 text-center">{title}</HMText>
      <HMText level={1} className="text-center">{note}</HMText>
      {shouldShowTdee && <HMText level={1} className="mt-auto text-center">{`BMR x ${activityFactor} = ${tdee}`}</HMText>}
    </div>)
}
export default ActivityCard