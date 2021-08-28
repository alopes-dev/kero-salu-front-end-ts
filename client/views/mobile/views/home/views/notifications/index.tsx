import { AuthContext } from '@contexts/auth'
import { useRouter } from 'next/router'
import React, { ChangeEvent, ReactNode, useContext, useRef } from 'react'
import { useState } from 'react'
import { IoChevronBackOutline, IoNotificationsOutline } from 'react-icons/io5'

import {
  Container,
  ActionsTopContainer,
  NotificationText,
  NotificationItems
} from './styles'
import toast, { Toaster } from 'react-hot-toast'
import { toastErrorProps } from '@constants/index'
import { useCallback } from 'react'
import { getSolicitation } from '@services/solicitation'
import { useEffect } from 'react'
import useAsyncState from '@client/hooks/use-async-state'
import { INotificationAttributes, ISolicitationAttributes } from '@itypes/index'
import { getNotificationsByDistination } from '@services/notifications'

export function getNumberOfDays(date: string) {
  const date1 = new Date(date)
  const date2 = new Date(Date.now())

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime()

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay)

  return diffInDays
}

const Notifications: React.FC = () => {
  const { back, push } = useRouter()
  const { user } = useContext(AuthContext)
  const { setData, data } = useAsyncState<Array<ISolicitationAttributes>>()
  const [notifiers, setNotifiers] = useState<Array<INotificationAttributes>>()
  const fetchSolicitation = useCallback(async () => {
    if (user) {
      const { error, message, data: result } = await getSolicitation(
        user.personId
      )
      if (error) return toast.error(message, toastErrorProps)
      setData(result)
    }
  }, [user])

  const fetchNotifications = useCallback(async () => {
    if (user) {
      const {
        error,
        message,
        data: result
      } = await getNotificationsByDistination(user.personId)
      if (error) return toast.error(message, toastErrorProps)
      setNotifiers(result)
    }
  }, [user])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useEffect(() => {
    fetchSolicitation()
  }, [fetchSolicitation])

  return (
    <Container>
      <Toaster />
      <ActionsTopContainer>
        <span
          onClick={() => {
            back()
          }}
        >
          <IoChevronBackOutline />
        </span>
      </ActionsTopContainer>

      <NotificationText>Centro de Notificações</NotificationText>

      {notifiers?.map(notify => (
        <NotificationItems
          onClick={() => push(`/mobile/notifications/${notify.id}`)}
          key={notify.id}
        >
          <div className="top">
            <IoNotificationsOutline
              style={{ color: notify.status === '0' ? 'blueviolet' : 'white' }}
            />
            <small>{getNumberOfDays(`${notify.createdAt}`)}d</small>
          </div>
          <div className="bottom">
            <h1>{notify?.company?.designation}</h1>
            <small>{notify?.description}</small>
          </div>
        </NotificationItems>
      ))}
      {data?.map(item => (
        <NotificationItems
          onClick={() => push(`/mobile/notifications/${item.id}`)}
          key={item.id}
        >
          <div className="top">
            <IoNotificationsOutline
              style={{ color: item.fileUrl ? 'white' : 'blueviolet' }}
            />
            <small>{getNumberOfDays(`${item.createdAt}`)}d</small>
          </div>
          <div className="bottom">
            <h1>{item?.candidature?.vacance?.company?.designation}</h1>
            <small>{item.description}</small>
          </div>
        </NotificationItems>
      ))}
    </Container>
  )
}

export default Notifications
