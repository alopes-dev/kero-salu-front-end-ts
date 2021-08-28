import {
  ActionsButton,
  CandidatesContainer,
  Candidate,
  Name,
  Button,
  Avatar
} from './style'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { VacanceContext } from '@contexts/vacancie'
import {
  IoCheckmarkOutline,
  IoFileTrayOutline,
  IoTrashOutline
} from 'react-icons/io5'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import { toastErrorProps, toastSuccessProps } from '@constants/index'
import { getOneVacance } from '@services/vacancies'
import { v4 as uuid } from 'uuid'
import { useLocalStorage } from 'just-hook'

export type OperationType = {
  id: string
  isAnalized: number
}

export const messageSuccess = {
  approved: 'Candidatura aceite',
  rejected: 'Candidatura rejeitada'
}

const CandidateListView: React.FC = () => {
  const {
    handleVacance,
    candidatures,
    handleCandidatureOperation,
    isDone
  } = useContext(VacanceContext)
  const { push, query } = useRouter()
  const [refresh, setRefresh] = useState<string | null>(null)
  const [_, storeData] = useLocalStorage('kero-salu@candidatureId')

  const handleOperation = async ({ id, isAnalized }: OperationType) => {
    try {
      const { error, message } = await handleCandidatureOperation({
        id,
        isAnalized
      })

      if (error) return toast.error(message, toastErrorProps)

      toast.success(
        messageSuccess[isAnalized == 1 ? 'approved' : 'rejected'],
        toastSuccessProps
      )

      setRefresh(uuid())
    } catch (error) {}
  }

  const refresher = useCallback(async () => {
    if (refresh) {
      const id = query.id as string
      const { data, error, message } = await getOneVacance(id)

      if (error) return toast.error(message, toastErrorProps)
      handleVacance(data)
    }
  }, [refresh])

  useEffect(() => {
    refresher()
  }, [refresher])

  return (
    <CandidatesContainer>
      <Toaster />
      <PerfectScrollbar>
        {candidatures?.map(({ candidate, isAnalized, id }, i) => {
          return (
            isAnalized !== -1 && (
              <Candidate key={i}>
                <div className="user-info">
                  {candidate.user?.photoUrl ? (
                    <Avatar>
                      <img
                        src={`http://localhost:5500/files/${candidate?.user?.photoUrl}`}
                        alt="...i"
                        className="avatar-img rounded-circle"
                      />
                    </Avatar>
                  ) : (
                    <Avatar>
                      <span>
                        {candidate.firstName.charAt(0)}
                        {candidate.lastName.charAt(0)}
                      </span>
                    </Avatar>
                  )}

                  <Name>{`${candidate.firstName} ${candidate.lastName} `}</Name>
                </div>
                <ActionsButton>
                  {isAnalized === 0 && isDone && (
                    <>
                      <Button
                        onClick={() =>
                          handleOperation({
                            id,
                            isAnalized: 1
                          })
                        }
                      >
                        <IoCheckmarkOutline className="accept" />
                        <span>Aprovar</span>
                      </Button>
                      |
                    </>
                  )}

                  <Button
                    className="file"
                    onClick={() => {
                      storeData(id)
                      push(`/dashboard/candidate/${candidate.id}/detail`).then()
                    }}
                  >
                    <IoFileTrayOutline className="file" />
                    <span>Curriculum</span>
                  </Button>
                  {isAnalized === 0 && isDone && (
                    <>
                      |
                      <Button
                        onClick={() => {
                          handleOperation({
                            id,
                            isAnalized: -1
                          })
                        }}
                      >
                        <IoTrashOutline className="reject" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                </ActionsButton>
              </Candidate>
            )
          )
        })}
      </PerfectScrollbar>
    </CandidatesContainer>
  )
}

export default CandidateListView
