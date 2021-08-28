import { AuthContext } from '@contexts/auth'
import { useRouter } from 'next/router'
import React, { ChangeEvent, ReactNode, useContext, useRef } from 'react'
import { useState } from 'react'
import {
  IoChevronBackOutline,
  IoClipboardOutline,
  IoCloseOutline,
  IoFileTrayOutline,
  IoAttachOutline
} from 'react-icons/io5'
import { api } from '@services/api'

import {
  Container,
  ActionsTopContainer,
  NotificationText,
  Avatar,
  SendAnexo,
  Paragraph
} from './styles'
import { UpdateUserAccount } from '@services/user-account'
import toast, { Toaster } from 'react-hot-toast'
import { toastErrorProps, toastSuccessProps } from '@constants/index'
import { useCallback } from 'react'
import {
  editSolicitation,
  getOneSolicitation,
  getSolicitation
} from '@services/solicitation'
import { useEffect } from 'react'
import useAsyncState from '@client/hooks/use-async-state'
import { ISolicitationAttributes } from '@itypes/index'
import { docsFileExtension } from '@utils/index'

const NotificationsViewer: React.FC = () => {
  const { back, query } = useRouter()
  const { user, setUser } = useContext(AuthContext)
  const [view, setView] = useState<ReactNode | null>(null)
  const browseFileButton = useRef<HTMLInputElement>(null)
  const { setData, data } = useAsyncState<ISolicitationAttributes>()

  const handlechange = async (e: ChangeEvent<HTMLInputElement>) => {
    const id = query.id as string
    try {
      const file = e.target.files[0]
      const formData = new FormData()

      formData.append('file', file)
      const { data } = await api.post('/upload', formData)

      const { error, message } = await editSolicitation({
        fileUrl: data.avatar_url,
        id: id
      })

      if (error) return toast.error(message, toastErrorProps)

      toast.success('Documento adicionado', toastSuccessProps)
    } catch (error) {
      toast.error(error.message, toastErrorProps)
    }
  }

  const fetchSolicitation = useCallback(async () => {
    if (query) {
      const id = query.id as string
      const { error, message, data: result } = await getOneSolicitation(id)
      if (error) return toast.error(message, toastErrorProps)
      setData(result)
    }
  }, [query])

  useEffect(() => {
    fetchSolicitation()
  }, [fetchSolicitation])

  return (
    <Container>
      <Toaster />
      <ActionsTopContainer>
        <input
          type="file"
          hidden
          ref={browseFileButton}
          name="file"
          accept={`.${docsFileExtension
            .slice(0, 1)
            .toString()}, ${docsFileExtension.join(', .')}`}
          onChange={handlechange}
        />
        <span
          onClick={() => {
            back()
          }}
        >
          <IoChevronBackOutline />
        </span>
      </ActionsTopContainer>

      {!view && (
        <>
          <NotificationText>
            <div className="container-img">
              <h3>{data?.candidature?.vacance?.company?.designation}</h3>
              <Avatar>FC</Avatar>
            </div>
          </NotificationText>
          <Paragraph>{data?.description}</Paragraph>
          <SendAnexo onClick={() => browseFileButton.current!.click()}>
            <IoAttachOutline /> Enviar Anexo
          </SendAnexo>
        </>
      )}
    </Container>
  )
}

export default NotificationsViewer
