import NotificationView from './notification'
import {
  IoKeyOutline,
  IoLayersOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoShieldOutline
} from 'react-icons/io5'
import ComapanyDetails from './detail'
import ResetPassword from './reset-password'

export const SettingConfig = {
  account: {
    icon: <IoPersonOutline size={24} />,
    title: 'Conta',
    view: <ComapanyDetails />
  },
  password: {
    icon: <IoKeyOutline size={24} />,
    title: 'Senhas',
    view: <ResetPassword />
  },
  security: {
    icon: <IoShieldOutline size={24} />,
    title: 'Segurança',
    view: <h1>Security</h1>
  },

  notificaiton: {
    icon: <IoNotificationsOutline size={24} />,
    title: 'Notificações',
    view: <NotificationView />
  }
}
