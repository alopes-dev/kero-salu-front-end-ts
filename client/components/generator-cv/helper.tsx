import {
  IoBusinessOutline,
  IoLayersOutline,
  IoSchoolOutline
} from 'react-icons/io5'

export const IconGenerator = {
  curse: { icon: <IoBusinessOutline />, title: 'Cursos' },
  education: { icon: <IoSchoolOutline />, title: 'Formação Académica' },
  experience: { icon: <IoLayersOutline />, title: 'Experiência Profissional' }
}

export const formatDate = (date: string) => {
  const [month, _, years] = new Date(date).toDateString().split(' ')

  return `${month} ${years}`
}
