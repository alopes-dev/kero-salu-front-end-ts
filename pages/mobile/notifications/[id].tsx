import React from 'react'

import GlobalStyle from '@styles/globalMobile'
import NotificationsViewer from '@client/views/mobile/views/home/views/notifications/view'

const NotificationViewerPage: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <NotificationsViewer />
    </>
  )
}

export default NotificationViewerPage
