import { FC, useCallback, useEffect, useState } from 'react'
import GenericTable from '@components/table'
import Profile from '@components/table/components/profile'
import Card from '@components/card'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import { deleteCompanys, getAllCompany } from '@services/insures'
import { ICompanyAttributes } from '@itypes/index'
import { useAsyncState } from 'just-hook'
import useIsMounted from '@client/hooks/use-is-mounted'
import { dataModifier } from './insures-helper'
import toast, { Toaster } from 'react-hot-toast'
import DeleteModal from '@components/modal/delete-modal'
import FilterForm from './components/filter'

const Insurers: FC = () => {
  const { push } = useRouter()

  const isMounted = useIsMounted()
  const [isOpen, setIsOpen] = useState(false)
  const { setData, data } = useAsyncState<ICompanyAttributes | any>()
  const [Company, setCompany] = useState(null)
  const [dataFilter, setDataDFilter] = useState<ICompanyAttributes | any>()

  const fetchAllCompanies = useCallback(async () => {
    try {
      const { data: res } = await getAllCompany()
      if (isMounted.current) {
        setData(dataModifier(res))
        setDataDFilter(dataModifier(res))
      }
    } catch (error) {}
  }, [])

  useEffect(() => {
    fetchAllCompanies()
  }, [])

  async function handleDelete() {
    const { error, message } = await deleteCompanys(Company)

    if (error)
      return toast.error(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#d85959',
          color: '#fff'
        }
      })

    if (isMounted.current) setIsOpen(false)

    toast.success(message, {
      duration: 4000,
      position: 'top-right'
    })

    fetchAllCompanies()
  }

  return (
    <Card classNames="bg-white shadow rounded-lg lg:pt-5 sm:px-6 lg:px-0">
      <div className="lg:flex lg:flex-end justify-between lg:flex-end px-4 pb-4">
        <Toaster />
        <DeleteModal
          title="Deseja eliminar essa Seguradora?"
          isOpen={isOpen}
          confirm={handleDelete}
          cancel={() => setIsOpen(false)}
        />
        <FilterForm data={(dataFilter as any) || []} triggerEvent={setData} />
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
            label: 'Denominação',
            key: 'name',
            view: Profile,
            isCustumized: true,
            info: 'alopes.dev@gmail.com',
            image: '/img/pic.jpeg'
          },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Telefone' },
          { key: 'nif', label: 'NIF' }
        ]}
        data={(data as any) || []}
        onUpdate={(data: ICompanyAttributes) => {
          push(`${ROUTES.VACANCIES_WITH_ID}/${data.id}/update`).then()
        }}
        onShow={(data: ICompanyAttributes) => {
          push(`${ROUTES.VACANCIES_WITH_ID}/${data.id}/detail`).then()
        }}
        onDelete={(data: ICompanyAttributes) => {
          setCompany(data.id)
          setIsOpen(true)
        }}
      />
    </Card>
  )
}

export default Insurers
