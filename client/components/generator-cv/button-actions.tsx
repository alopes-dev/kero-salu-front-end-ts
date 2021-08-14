import {
  messageSuccess,
  OperationType
} from '@client/views/dashboard/views/vacancies/views/details/candidates-list'
import { toastSuccessProps, toastErrorProps } from '@constants/index'
import { getOneCandidature, updateCandidature } from '@services/candidature'
import { useLocalStorage } from 'just-hook'
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {
  IoCheckmarkOutline,
  IoFileTrayOutline,
  IoMegaphoneOutline,
  IoTrashOutline
} from 'react-icons/io5'
import { Button, ActionsButton } from './style'

type MessagesType = {
  error: boolean
  message: string
  isAnalized: number
}
const messages = ({ error, message, isAnalized }: MessagesType) => {
  if (error) return toast.error(message, toastErrorProps)

  toast.success(
    messageSuccess[isAnalized == 1 ? 'approved' : 'rejected'],
    toastSuccessProps
  )
}

const candidatureStatusContent = {
  '1': 'Aprovado',
  '-1': 'Rejeitado'
}

const ButtonsActions: React.FC = () => {
  const [id] = useLocalStorage('kero-salu@candidatureId')
  const [approved, setApproved] = useState<number>(0)

  const handleOperation = async ({ id, isAnalized }: OperationType) => {
    try {
      const { error, message } = await updateCandidature({
        id,
        isAnalized
      })
      messages({ error, message, isAnalized })
    } catch (error) {
      messages({ error, message: error.message, isAnalized })
    }
  }

  const checkCandidatureStatus = useCallback(async () => {
    if (id) {
      const { data, error, message } = await getOneCandidature(`${id}`)

      if (error) return toast.error(message, toastErrorProps)
      setApproved(data?.isAnalized)
    }
  }, [id])

  useEffect(() => {
    checkCandidatureStatus()
  }, [checkCandidatureStatus])

  return (
    <>
      <Toaster />
      {approved !== -1 && (
        <ActionsButton>
          <Button>
            <IoFileTrayOutline className="file" />
            Solicitar Documentos
          </Button>
        </ActionsButton>
      )}

      <ActionsButton className="mt-3">
        <span className={candidatureStatusContent[approved]}>
          {candidatureStatusContent[approved]}
        </span>
        {approved === 0 && (
          <>
            <Button
              onClick={() => {
                handleOperation({
                  isAnalized: 1,
                  id: `${id}`
                })
              }}
            >
              <IoCheckmarkOutline className="accept" />
              Aprovar
            </Button>
            <Button
              onClick={() => {
                handleOperation({
                  isAnalized: -1,
                  id: `${id}`
                })
              }}
            >
              <IoTrashOutline className="reject" />
              Rejeitar
            </Button>
          </>
        )}
      </ActionsButton>
      {approved === 1 && (
        <ActionsButton className="mt-3">
          <Button>
            <IoMegaphoneOutline className="file" />
            Solicitar Entrevista
          </Button>
        </ActionsButton>
      )}
    </>
  )
}

export default ButtonsActions
