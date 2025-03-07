'use client'
import HeroImg from '../public/yoga-female.jpg'
import Image from 'next/image'
import './globals.css'
import HMText from '@/components/ui/HMText'

export default function Home() {
  return <div className="h-full mt-[100px] max-lg:mt-[64px]">
    {/* Hero Section */}
    <div className="w-full flex gap-6 items-center justify-center max-lg:flex-col max-lg:px-4">
      <div className="relative w-96 h-96 rounded-full overflow-hidden">
        <Image 
          src={HeroImg} 
          width={600} 
          height={600} 
          alt="Photo by Oksana Taran on Unsplash" 
          className="object-cover w-full h-full"
        />
        {/* 模擬邊緣模糊效果 */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-[inset_0_0_20px_30px_rgba(237,237,237,1)] pointer-events-none"></div>
      </div>
      <HMText level={6} color="text-primary-100" className="max-lg:text-center">
      Your Personal <br />Weight Management Assistant</HMText>
    </div>
  </div>
}
