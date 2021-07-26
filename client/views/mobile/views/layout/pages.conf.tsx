import {
  IoBookmarksOutline,
  IoLayersOutline,
  IoLogOut,
  IoPersonOutline,
  IoSettingsOutline
} from 'react-icons/io5'

export const Navigation = {
  Home: {
    title: 'Home',
    icon: <IoLayersOutline size={24} />,
    url: '/mobile'
  },
  jobsDetails: {
    title: 'Detalhe',
    icon: <IoLayersOutline size={24} />,
    url: '/mobile/vagas',
    hide: true
  },
  InPogress: {
    title: 'Minhas Vagas',
    icon: <IoBookmarksOutline size={24} />,
    url: '/mobile/vagas'
  },
  Settings: {
    title: 'Definições',
    icon: <IoSettingsOutline size={24} />,
    url: '/mobile/settings'
  }
}

export const Profile = {
  Profile: {
    title: 'Perfil',
    icon: <IoPersonOutline size={24} />,
    url: '/mobile/profile'
  },

  SignOut: {
    title: 'Sair',
    icon: <IoLogOut size={24} />,
    func: cb => {
      cb()
    }
  }
}
