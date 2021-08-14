import React, { useCallback, useEffect } from 'react'

import { Container, CVContainer, JobsList, Scroller } from './style'
import { GeneratorCVProps } from './types'
import CvViewer from './CV'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ButtonsActions from './button-actions'
import VacanciesList from './vacancies-list'
import useAsyncState from '@client/hooks/use-async-state'
import useIsMounted from '@client/hooks/use-is-mounted'
import { AuthContext } from '@contexts/auth'
import {
  getAllVacancies,
  getAllVacanciesByCompanyId
} from '@services/vacancies'
import { useContext } from 'react'
import { IVacanciesAttributes } from '@itypes/index'
import { v4 as uuid } from 'uuid'
import { useLocalStorage } from 'just-hook'

const cardClasses = 'max-w-7xl bg-white shadow rounded-lg m-2 py-6 sm:px-6'

const GeneratorCV: React.FC<GeneratorCVProps> = ({ candidate }) => {
  const { user } = useContext(AuthContext)
  const isMounted = useIsMounted()
  const [candidatureId] = useLocalStorage('kero-salu@candidatureId')

  const { data, setData } = useAsyncState<Array<IVacanciesAttributes>>()

  const fetchAllVacancies = useCallback(async () => {
    try {
      if (user) {
        const { data: res } = await getAllVacanciesByCompanyId(user?.companyId)
        const result = res.filter(item =>
          item.candidatures?.every(cand => {
            if (cand.id !== candidatureId) return false
          })
        )

        if (isMounted.current) setData(result)
      }
    } catch (error) {
      console.error(error.message)
    }
  }, [user])

  useEffect(() => {
    fetchAllVacancies()
  }, [fetchAllVacancies])

  return (
    <Container>
      <CVContainer className={`${cardClasses}  lg:px-8`}>
        <CvViewer candidate={candidate} />
      </CVContainer>
      <JobsList>
        <div className={`${cardClasses} lg:px-3`}>
          <ButtonsActions />
        </div>
        <Scroller>
          {data?.map(item => (
            <div key={uuid()} className={`${cardClasses} mt-5`}>
              <VacanciesList vacance={item} />
            </div>
          ))}
        </Scroller>
      </JobsList>
    </Container>
  )
}

export default GeneratorCV
