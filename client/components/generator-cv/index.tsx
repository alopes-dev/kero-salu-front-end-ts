import React, { useCallback, useEffect } from 'react'

import {
  Container,
  CVContainer,
  JobsList,
  Scroller,
  DocumentContainer,
  Document
} from './style'
import { GeneratorCVProps } from './types'
import CvViewer from './CV'
import ButtonsActions from './button-actions'
import VacanciesList from './vacancies-list'
import useAsyncState from '@client/hooks/use-async-state'
import useIsMounted from '@client/hooks/use-is-mounted'
import { AuthContext } from '@contexts/auth'
import { getAllVacanciesByCompanyId } from '@services/vacancies'
import { useContext } from 'react'
import { ISolicitationAttributes, IVacanciesAttributes } from '@itypes/index'
import { v4 as uuid } from 'uuid'
import { useLocalStorage } from 'just-hook'
import { IoEyeOutline } from 'react-icons/io5'
import { SolicitationListByCandidature } from '@services/solicitation/index'
import { useState } from 'react'
import ModalIframe from '@components/modal/modal-iframe'

const cardClasses = 'max-w-7xl bg-white shadow rounded-lg m-2 py-6 sm:px-6'

const GeneratorCV: React.FC<GeneratorCVProps> = ({ candidate }) => {
  const { user } = useContext(AuthContext)
  const isMounted = useIsMounted()
  const [candidatureId] = useLocalStorage('kero-salu@candidatureId')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data, setData } = useAsyncState<Array<IVacanciesAttributes>>()
  const [fileRender, setFileRender] = useState<string>('')
  const [solicitation, setSolicitation] = useState<
    Array<ISolicitationAttributes>
  >()

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

  const fetchSolicitationByCandidature = useCallback(async () => {
    try {
      if (candidatureId) {
        const { data: res } = await SolicitationListByCandidature(
          `${candidatureId}`
        )

        if (isMounted.current) setSolicitation(res)
      }
    } catch (error) {
      console.error(error.message)
    }
  }, [candidatureId])

  useEffect(() => {
    fetchSolicitationByCandidature()
  }, [fetchSolicitationByCandidature])

  useEffect(() => {
    fetchAllVacancies()
  }, [fetchAllVacancies])

  return (
    <>
      <Container>
        <CVContainer className={`${cardClasses}  lg:px-8`}>
          <CvViewer candidate={candidate} />
        </CVContainer>

        <JobsList>
          <div className={`${cardClasses} lg:px-3`}>
            <ButtonsActions candidate={candidate} />
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
      <div style={{ width: '75%' }} className={`${cardClasses} lg:px-3`}>
        <h5 className="mb-2">Documentos solicitados</h5>
        <ModalIframe isOpen={isOpen} cancel={() => setIsOpen(false)}>
          <iframe
            style={{ width: '100%', height: '500px' }}
            src={`http://localhost:5500/files/${fileRender}`}
            title="W3Schools Free Online Web Tutorials"
          ></iframe>
        </ModalIframe>
        <DocumentContainer>
          {solicitation?.map(item => (
            <Document key={item.id}>
              <span>{item?.documentType?.designation}</span>
              <span>{item?.createdAt}</span>
              <span>{item?.fileUrl ? 'Enviado' : 'Pendente'}</span>
              {item?.fileUrl && (
                <span>
                  <IoEyeOutline
                    onClick={() => {
                      setFileRender(item?.fileUrl)
                      setTimeout(() => setIsOpen(true), 600)
                    }}
                  />
                </span>
              )}
            </Document>
          ))}
        </DocumentContainer>
      </div>
    </>
  )
}

export default GeneratorCV
