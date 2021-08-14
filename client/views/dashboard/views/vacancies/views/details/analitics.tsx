import React from 'react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

import { useContext } from 'react'
import { VacanceContext } from '@contexts/vacancie'

const AnaliticsView: React.FC = () => {
  const { analitics } = useContext(VacanceContext)

  return (
    <Chart
      options={analitics.options as ApexOptions}
      series={analitics.series}
      type="bar"
      width="100%"
      background="#f4f4f4"
      forecolor="#333"
    />
  )
}

export default AnaliticsView
