import {
  messageSuccess,
  OperationType
} from '@client/views/dashboard/views/vacancies/views/details/candidates-list'
import ModalSolicitationForm from '@components/modal/modal-solicitaion-form'
import { toastSuccessProps, toastErrorProps } from '@constants/index'
import { IPersonAttributes } from '@itypes/index'
import { getOneCandidature, updateCandidature } from '@services/candidature'
import { postSolicitation } from '@services/solicitation'
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
import SolicitationForm from './solicitation-form'
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

type ButtonsActionsProps = {
  candidate: IPersonAttributes
}

const ButtonsActions: React.FC<ButtonsActionsProps> = ({ candidate }) => {
  const [id] = useLocalStorage('kero-salu@candidatureId')
  const [approved, setApproved] = useState<number>(0)
  const [solicitationData, setSolicitationData] = useState<any>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

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

  const sendSolicitation = async () => {
    const { description, documentTypeId } = solicitationData

    const { error, message } = await postSolicitation({
      description,
      documentTypeId,
      candidateId: candidate.id,
      candidatureId: `${id}`
    })

    if (error) return toast.error(message, toastErrorProps)

    toast.success('Solicitação feita', toastSuccessProps)

    setIsOpen(false)
  }

  return (
    <>
      <Toaster />
      <ModalSolicitationForm confirm={sendSolicitation} isOpen={isOpen}>
        <div style={{ width: '370px' }}>
          <h1>Testando formulario</h1>
          <SolicitationForm
            gettersValue={data => {
              setSolicitationData(data)
            }}
          />
        </div>
      </ModalSolicitationForm>
      {approved !== -1 && (
        <ActionsButton>
          <Button onClick={() => setIsOpen(true)}>
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
