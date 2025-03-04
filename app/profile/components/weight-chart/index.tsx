import React, { useEffect, useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { AuthData } from '@/store/useAuthStore'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { timestampConvertDate } from '@/lib/utils/helper'
import { UserInfo } from '@/store/useUserInfoStore'
interface WeightChartProps {
  auth: AuthData | null
  userInfo: UserInfo
}
const WeightChart = ({ auth, userInfo }:WeightChartProps) => {
  const [weightRecords, setWeightRecords] = useState<Common.Body.WeightRecords[]>([])
  useEffect(() => {
    if(!userInfo?.hasInputBasicInfo || !auth?.uid) return
    const getWeightData = async() => {
      const userDocRef = doc(db, 'users', auth.uid) // 取得該 uid 的文件
      const userDocSnap = await getDoc(userDocRef) // 讀取文件
      const userData = userDocSnap.data() // 取得文件內的資料
      const bodyRecords = userData?.bodyRecords || [] // 確保 bodyRecords 存在
      setWeightRecords(bodyRecords)
    }
    getWeightData()
  },[auth, userInfo])
  const weightList=useMemo(()=> {
    return weightRecords.map(record => Number(record.weight))
  },[weightRecords])
  const bmiList=useMemo(()=> {
    return weightRecords.map(record => Number(record.bmi))
  },[weightRecords])
  const dateList=useMemo(()=> { return weightRecords.map(record => timestampConvertDate(record.inputDate))},[weightRecords])

  const options = {
    grid: { top: 48, right: 24, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: dateList,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name:'Weight(kg)',
        data: weightList,
        type: 'line',
        smooth: true,
      },
      {
        name: 'BMI',
        data: bmiList,
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data:['Weight(kg)','BMI'],
    },
  }

  return (
    dateList.length ? <div className="w-full mt-8"><ReactECharts option={options} /></div> : null)
}

export default WeightChart