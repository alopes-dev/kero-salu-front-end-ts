import { FC } from 'react'
import GenericTable from '@components/table'
import Profile from '@components/table/components/profile'
import Card from '@components/card'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'

const Insurers: FC = () => {
  const { push } = useRouter()

  return (
    <Card classNames="bg-white shadow rounded-lg lg:pt-5 sm:px-6 lg:px-0">
      <div
        className="lg:flex lg:flex-end lg:flex-end px-4 pb-4"
        style={{ justifyContent: 'flex-end' }}
      >
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              onClick={() => push(ROUTES.CANDIDATE_CREATE).then()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircleIcon
                className="-ml-1 mr-2 h-5 w-5 text-white"
                aria-hidden="true"
                style={{ color: '#fff' }}
              />
              Nova seguradora
            </button>
          </span>
        </div>
      </div>

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
    </Card>
  )
}

export default Insurers
