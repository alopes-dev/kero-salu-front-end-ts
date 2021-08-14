import { createContext, useCallback, useEffect, useState } from 'react'

import { ICandidatureAttributes, IVacanciesAttributes } from '@itypes/index'
import { useMemo } from 'react'
import { analiticsData } from '@client/views/dashboard/views/vacancies/views/details/analitics-data'
import { setStatus, setSeries } from './helpers'
import { updateCandidature } from '@services/candidature'

export interface ICandidatureStatus {
  approved: Array<ICandidatureAttributes>
  rejected: Array<ICandidatureAttributes>
  subscrib: Array<ICandidatureAttributes>
  vacanceNumber: number
}

type VacanceContextType = {
  vacance: IVacanciesAttributes
  candidatures: Array<ICandidatureAttributes>
  candidatureStatus: ICandidatureStatus
  analitics: any
  isDone: boolean
  handleCandidatureOperation(data: CandidatureOperation): Promise<any>
  handleVacance(data: IVacanciesAttributes): void
}

type CandidatureOperation = {
  id: string
  isAnalized: number
}

const initialStatus = {
  approved: [],
  subscrib: [],
  rejected: []
} as ICandidatureStatus

export const VacanceContext = createContext({} as VacanceContextType)

const getStatus = (isDone: string): boolean => isDone === '0'
export function VacanceProvider({ children }) {
  const [vacance, setVacance] = useState<IVacanciesAttributes | null>(null)
  const [isDone, setIsDone] = useState<boolean>(true)
  const [candidatures, setCandidatures] = useState<
    Array<ICandidatureAttributes>
  >()
  const [
    candidatureStatus,
    setCandidatureStates
  ] = useState<ICandidatureStatus>(initialStatus)

  const [analitics, setAnalitics] = useState(analiticsData)

  const handleVacance = useCallback((data: IVacanciesAttributes) => {
    setVacance(data)
  }, [])

  useEffect(() => {
    if (vacance) {
      setCandidatureStates(setStatus(vacance))
      setAnalitics(prev => ({
        ...prev,
        series: setSeries(vacance.candidatures)
      }))
      setCandidatures(vacance.candidatures)
      setIsDone(getStatus(vacance.isDone))
    }
  }, [vacance])

  const handleCandidatureOperation = async ({
    id,
    isAnalized
  }: CandidatureOperation) => {
    return await updateCandidature({
      id,
      isAnalized
    })
  }

  const contextValues = useMemo(
    () => ({
      vacance,
      handleVacance,
      analitics,
      candidatureStatus,
      candidatures,
      handleCandidatureOperation,
      isDone
    }),
    [
      vacance,
      handleVacance,
      candidatureStatus,
      analitics,
      candidatures,
      handleCandidatureOperation,
      isDone
    ]
  )

  return (
    <VacanceContext.Provider value={contextValues}>
      {children}
    </VacanceContext.Provider>
  )
}
