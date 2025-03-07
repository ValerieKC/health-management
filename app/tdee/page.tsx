'use client'


import { useState } from 'react'
import Calculator from './components/calculator'
import TdeePanel from './components/tdee-panel'

const Tdee = () => {
  const [bmrResult, setBmrResult] = useState('')
  const [shouldShowTdee, setShouldShowTdee] = useState(false)
  return (
    <div className="w-[1000px] max-lg:w-full mx-auto mt-16 max-lg:mt-8 flex max-lg:flex-col gap-6 max-lg:px-4">
      {/* 基礎代謝率計算機 */}
      <Calculator bmrResult={bmrResult} setBmrResult={setBmrResult} setShouldShowTdee={setShouldShowTdee} />
      {/* TDEE結果 */}
      <TdeePanel bmrResult={bmrResult} shouldShowTdee={shouldShowTdee} />

    </div>
  )
}
export default Tdee