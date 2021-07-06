import {
  IoLayersOutline,
  IoCogOutline,
  IoPersonOutline,
  IoBusinessOutline,
  IoBookmarksOutline
} from 'react-icons/io5'

import { SideRouter } from '@constants/side-menu'
import { SideMenuItem } from './side-menu.types'
import Insurers from './views/insurers'
import Candidates from './views/candidates'
import Dashboard from './views/dashboard'
import Settings from './views/settings'
import Vacancies from './views/vacancies'

export const SideMenuItemView = {
  [SideRouter.Dashboard]: {
    title: 'Dashboard',
    icon: IoLayersOutline,
    url: SideRouter.Dashboard,
    view: Dashboard
  },
  [SideRouter.Vacancies]: {
    title: 'Vagas',
    icon: IoBookmarksOutline,
    url: SideRouter.Vacancies,
    view: Vacancies
  },
  [SideRouter.Insurers]: {
    title: 'Seguradoras',
    icon: IoBusinessOutline,
    url: SideRouter.Insurers,
    view: Insurers
  },
  [SideRouter.Candidates]: {
    title: 'Candidatos',
    icon: IoPersonOutline,
    url: SideRouter.Candidates,
    view: Candidates
  },
  [SideRouter.Settings]: {
    title: 'Definições',
    icon: IoCogOutline,
    url: SideRouter.Settings,
    view: Settings
  }
} as Record<SideRouter, SideMenuItem>
