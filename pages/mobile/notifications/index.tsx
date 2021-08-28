import React from 'react'

import GlobalStyle from '@styles/globalMobile'
import NotificationsView from '@client/views/mobile/views/home/views/notifications'

const NotificationsPage: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <NotificationsView />
    </>
  )
}

export default NotificationsPage
