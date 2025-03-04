'use client'
import HeroImg from '../public/yoga-female.jpg'
import Image from 'next/image'
import './globals.css'
import HMText from '@/components/ui/HMText'

export default function Home() {
  return <div className="h-full mt-[100px] max-lg:mt-[64px]">
    {/* Hero Section */}
    <div className="w-full flex gap-6 items-center justify-center max-lg:flex-col max-lg:px-4">
      
      <Image src={HeroImg} width={600} height={300} alt="Photo by Oksana Taran on Unsplash" className='' />
      <HMText level={6} color="text-primary-100" className="max-lg:text-center">
      Your Personal <br />Weight Management Assistant</HMText>
    </div>
  </div>
}
