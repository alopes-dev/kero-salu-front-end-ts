import { FC } from 'react'
import GenericTable from '@components/table'
import Profile from '@components/table/components/profile'

const Settings: FC = () => {
  return (
    <GenericTable
      columns={[
        {
          label: 'Nome',
          key: 'name',
          view: Profile,
          isCustumized: true,
          info: 'alopes.dev@gmail.com',
          image: '/img/pic.jpeg'
        },
        { key: 'age', label: 'Idade' }
      ]}
      data={[
        { name: 'António Lopes', age: '27 anos' },
        { name: 'Fábio Monteiro', age: '27 anos' },
        { name: 'Wilson Lopes', age: '27 anos' },
        { name: 'Rosa Lopes', age: '27 anos' }
      ]}
    />
  )
}

export default Settings
