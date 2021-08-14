import {
  IoBodyOutline,
  IoCallOutline,
  IoCloudUploadOutline,
  IoLanguageOutline,
  IoLayersOutline,
  IoLibraryOutline,
  IoPricetagsOutline,
  IoSchoolOutline,
  IoSettingsOutline
} from 'react-icons/io5'
import Academy from './views/academy'
import Curse from './views/curse'
import Experience from './views/experience'
import HobbesView from './views/hobbs'
import Languages from './views/languages'
import SettingsView from './views/settings'
import SkillView from './views/skills'

export const ProfileConf = {
  experience: {
    experience: {
      icon: <IoPricetagsOutline />,
      title: 'Experiência Profissional',
      view: <Experience />
    },
    academic: {
      icon: <IoSchoolOutline />,
      title: 'Formação Acadêmicos',
      view: <Academy />
    },
    skills: {
      icon: <IoBodyOutline />,
      title: 'Competência',
      view: <SkillView />
    },

    hobbes: {
      icon: <IoLibraryOutline />,
      title: 'Hobbes',
      view: <HobbesView />
    }
  },
  details: {
    curses: {
      icon: <IoSchoolOutline />,
      title: 'Cursos',
      view: <Curse />
    },
    contacts: {
      icon: <IoCallOutline />,
      title: 'Contactos',
      view: <h1>Hallo</h1>
    },
    documents: {
      icon: <IoCloudUploadOutline />,
      title: 'Documentos',
      view: <h1>Hallo</h1>
    },
    languages: {
      icon: <IoLanguageOutline />,
      title: 'Idiomas',
      view: <Languages />
    },
    settings: {
      icon: <IoSettingsOutline />,
      title: 'Definições',
      view: <SettingsView />
    }
  }
}
