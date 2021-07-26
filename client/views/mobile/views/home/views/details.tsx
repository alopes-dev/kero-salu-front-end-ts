import useIsMounted from '@client/hooks/use-is-mounted'
import { AuthContext } from '@contexts/auth'
import { IVacanciesAttributes } from '@itypes/index'
import { postCandidature } from '@services/candidature'
import theme from '@styles/theme'
import { useAsyncState } from 'just-hook'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import {
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkDone,
  IoCheckmarkDoneOutline,
  IoCheckmarkOutline,
  IoDocumentAttachOutline,
  IoHeartOutline,
  IoLocationOutline,
  IoShareSocial,
  IoShieldOutline
} from 'react-icons/io5'
import CompanyInfoView from './company'
import DescriptionView from './desciption'
import toast, { Toaster } from 'react-hot-toast'

import {
  ActionBottomContainer,
  ActionsTopContainer,
  Container,
  InfoContainer
} from './styles'
import { toastErrorProps, toastSuccessProps } from '@constants/index'
import { useEffect } from 'react'
import { verifyCandidature } from '@services/candidature/index'

const favoriteButtonStyle = {
  borderRadius: '15px',
  width: '20%',
  border: '1px solid #f59595'
}

const applyButtonStyle = {
  width: '80%',
  borderRadius: '15px',
  backgroundColor: '#0d1146'
}

const tabButtonStyle = {
  opacity: '0.6',
  backgroundColor: '#ccc',
  borderRadius: '15px'
}

const buttonAtive = {
  backgroundColor: '#0d1146',
  color: '#fff',
  borderRadius: '15px'
}

type JobDetailProps = {
  job: IVacanciesAttributes
}

type DetailRender = 'COMPANY' | 'DESCIPTION'

const generateButtonStyle = (isOk: boolean) => ({
  ...applyButtonStyle,
  backgroundColor: !isOk ? '#0d1146' : '#ccc',
  color: !isOk ? '#fff' : '#000',
  opacity: !isOk ? 1 : 0.6
})

const JobDetailsViews: React.FC<JobDetailProps> = ({ job }) => {
  const { back } = useRouter()
  const { user } = useContext(AuthContext)
  const isMounted = useIsMounted()
  const [detailRender, setDetailRender] = useState<DetailRender>('DESCIPTION')
  const { loading, setLoading, data, setData } = useAsyncState<boolean>()

  const handleApplyJob = async () => {
    if (data) return
    const { error, message } = await postCandidature({
      candidateId: user.personId,
      vacanciesId: job.id
    })

    if (isMounted.current) setLoading(false)

    if (error) return toast.error(message, toastErrorProps)

    toast.success(message, toastSuccessProps)

    setTimeout(() => back(), 2000)
  }

  const checkJobs = useCallback(async () => {
    const { error, message, data: res } = await verifyCandidature({
      candidateId: user.personId,
      vacanciesId: job.id
    })

    if (isMounted.current) setLoading(false)

    if (error) toast.error(message, toastErrorProps)

    setData(res.already)
  }, [user, job])

  useEffect(() => {
    checkJobs()
  }, [checkJobs])

  return (
    <Container>
      <Toaster />
      <ActionsTopContainer>
        <span onClick={back}>
          <IoArrowBackOutline />
        </span>
        <span>
          <IoShareSocial />
        </span>
      </ActionsTopContainer>
      <InfoContainer>
        <div className="image-container">
          <img src={'/img/pic.jpeg'} alt={`asas`} />
        </div>
        <h1>{job.functionType?.designation}</h1>
        <p>
          <strong>{job.company?.designation} /</strong>
          <IoLocationOutline />
          <small>
            {job.province?.designation},{job.nationality?.designation}
          </small>
        </p>
        <p className="flex mb-2 pt-5">
          <button
            style={
              detailRender === 'DESCIPTION'
                ? { ...buttonAtive }
                : { ...tabButtonStyle }
            }
            onClick={() => setDetailRender('DESCIPTION')}
            className={`group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black outline-none  `}
          >
            <IoDocumentAttachOutline className="mr-3" size={20} /> Descrição
          </button>
          <button
            style={
              detailRender === 'COMPANY'
                ? { ...buttonAtive }
                : { ...tabButtonStyle }
            }
            onClick={() => setDetailRender('COMPANY')}
            className="group relative ml-3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black outline-none  "
          >
            <IoShieldOutline className="mr-3" size={20} /> Seguradora
          </button>
        </p>
        {detailRender === 'DESCIPTION' ? (
          <DescriptionView job={job} />
        ) : (
          <CompanyInfoView job={job} />
        )}
      </InfoContainer>
      <ActionBottomContainer>
        <div className="flex mb-2 px-2">
          <button
            style={favoriteButtonStyle}
            className=" relative flex justify-center py-2 px-4 bg-transparent border border-transparent text-sm font-medium rounded-md text-white  hover:bg-indigo-600 "
          >
            <IoHeartOutline size={29} />
          </button>

          <button
            onClick={handleApplyJob}
            style={generateButtonStyle(data)}
            className="relative ml-3 flex justify-center flex  py-3 px-4 border border-transparent text-md font-bold rounded-md  outline-none  "
          >
            {data ? (
              <IoCheckmarkDoneOutline
                className="mr-3"
                style={{ color: 'green' }}
                size={26}
              />
            ) : (
              <IoCheckmarkCircleOutline
                className="mr-3"
                style={{ color: 'green' }}
                size={27}
              />
            )}

            {data ? 'Vaga já aplicada' : 'Aplicar para vaga'}
          </button>
        </div>
      </ActionBottomContainer>
    </Container>
  )
}

export default JobDetailsViews
