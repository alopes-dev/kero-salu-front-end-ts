import { getNumberOfDays } from '@client/views/mobile/views/home/views/notifications'
import { AuthContext } from '@contexts/auth'

import { useContext } from 'react'
import { FC } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5'
import { NotificationItems, Container } from './styles'

const NotificationView: FC = () => {
  const { notifiers } = useContext(AuthContext)

  return (
    <Container>
      {notifiers?.map(notify => (
        <NotificationItems
          // onClick={() => push(`/mobile/notifications/${'item.id'}`)}
          key={notify.id}
        >
          <div className="top">
            <IoNotificationsOutline
              style={{ color: notify.status === '0' ? 'blueviolet' : 'white' }}
            />
            <small>{getNumberOfDays(`${notify.createdAt}`)}d</small>
          </div>
          <div className="bottom">
            <small>{notify?.company?.designation}</small>
            <small>{notify?.description}</small>
          </div>
        </NotificationItems>
      ))}
    </Container>
  )
}

export default NotificationView
