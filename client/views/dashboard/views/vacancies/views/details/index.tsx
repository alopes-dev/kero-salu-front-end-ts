import { VacanceContext } from '@contexts/vacancie'
import { IVacanciesAttributes } from '@itypes/index'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import AnaliticsView from './analitics'
import CandidateListView from './candidates-list'
import ResumeCard from './resume-card'
import MoredDetails from './more-details'

import { Container, ContainerAnality, Status } from './style'
import { getOneVacance, updateVacancies } from '@services/vacancies'
import { toastErrorProps, toastSuccessProps } from '@constants/index'
import toast, { Toaster } from 'react-hot-toast'
import { useCallback } from 'react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
const cardClasses = 'bg-white shadow rounded-lg m-2'

type VacanciesDetailProps = {
  vacancie: IVacanciesAttributes
}
const VacanciesDetails: React.FC<VacanciesDetailProps> = ({ vacancie }) => {
  const { handleVacance, isDone } = useContext(VacanceContext)
  const [refresh, setRefresh] = useState<string>('')

  useEffect(() => {
    handleVacance(vacancie)
  }, [vacancie])

  const refresher = useCallback(async () => {
    if (refresh) {
      const res = await getOneVacance(vacancie.id)
      handleVacance(res.data)
    }
  }, [refresh])

  useEffect(() => {
    refresher()
  }, [refresher])
  const handleDoneVacance = async () => {
    const { error, message } = await updateVacancies({
      id: vacancie.id,
      isDone: !!isDone
    })
    if (error) return toast.error(message, toastErrorProps)

    toast.success(message, toastSuccessProps)
    setRefresh(uuid())
  }

  return (
    <Container>
      <Toaster />
      <Status onClick={handleDoneVacance} active={isDone}>
        <span>{isDone ? 'On' : 'Off'}</span>
      </Status>
      <ResumeCard />
      <ContainerAnality>
        <div className={cardClasses}>
          <AnaliticsView />
        </div>
        <div className={cardClasses}>
          <CandidateListView />
        </div>
      </ContainerAnality>

      <MoredDetails vacancie={vacancie} />
    </Container>
  )
}

export default VacanciesDetails
