import React, { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { timestampConvertDate } from '@/lib/utils/helper'

interface WeightChartProps {
  weightRecords: Common.Body.WeightRecords[]
}
const WeightChart = ({ weightRecords }:WeightChartProps) => {

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