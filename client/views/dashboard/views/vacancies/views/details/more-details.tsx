import useIsMounted from '@client/hooks/use-is-mounted'
import DeleteModal from '@components/modal/delete-modal'
import { ROUTES } from '@constants/routes'
import {
  PaperClipIcon,
  CurrencyPoundIcon,
  MailOpenIcon,
  MapIcon,
  ClockIcon,
  BookOpenIcon,
  FlagIcon,
  TrashIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import { IVacanciesAttributes, Select } from '@itypes/index'
import { deleteVacances } from '@services/vacancies'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FC } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { toastErrorProps, toastSuccessProps } from '@constants/index'
import { formateDate } from '@components/generator-cv/vacancies-list'

type VacanciesDetailProps = {
  vacancie: IVacanciesAttributes
}
const VacanciesDetails: FC<VacanciesDetailProps> = ({ vacancie }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { back, push } = useRouter()
  const isMounted = useIsMounted()

  async function handleDelete() {
    const { error, message } = await deleteVacances(vacancie.id)

    if (error) return toast.error(message, toastErrorProps)

    if (isMounted.current) setIsOpen(false)

    toast.success(message, toastSuccessProps)

    setTimeout(() => {
      back()
    }, 3000)
  }

  return (
    <div
      style={{ margin: '10px' }}
      className="bg-white shadow overflow-hidden sm:rounded-lg"
    >
      <DeleteModal
        title="Deseja eliminar essa vaga?"
        isOpen={isOpen}
        confirm={handleDelete}
        cancel={() => setIsOpen(false)}
      />
      <div
        className="px-4 py-5 flex sm:px-6"
        style={{ justifyContent: 'space-between' }}
      >
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Detalhe da Vaga
        </h3>

        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon
              className="-ml-1 mr-2 h-5 w-5 text-white"
              aria-hidden="true"
              style={{ color: '#fff' }}
            />
            {/* {loading ? 'Processando...' : 'Salvar'} */}
            Cancelar
          </button>
          <button
            onClick={() =>
              push(`${ROUTES.VACANCIES_WITH_ID}/${vacancie.id}/update`).then()
            }
            className="inline-flex ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserGroupIcon
              className="-ml-1 mr-2 h-5 w-5 text-white"
              aria-hidden="true"
              style={{ color: '#fff' }}
            />
            {/* {loading ? 'Processando...' : 'Salvar'} */}
            Editar
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Função</dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.functionType?.designation}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Tipo de Contrato
            </dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.job?.designation}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex">
              <MailOpenIcon
                className=" h-5 w-5 text-gray-400 mr-2"
                aria-hidden="true"
              />
              Email
            </dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.user?.email}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm flex font-medium text-gray-500">
              <CurrencyPoundIcon
                className=" h-5 w-5 text-gray-400 mr-2"
                aria-hidden="true"
              />
              Salário
            </dt>
            <dd className="mt-1 flex   text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'AOA'
              }).format(vacancie?.salary)}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Sector a Enquadrar
            </dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.office?.designation}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium flex text-gray-500">
              <BookOpenIcon
                className=" h-5 w-5 text-gray-400 mr-2"
                aria-hidden="true"
              />
              Formação académica
            </dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.formationType?.designation}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Experiência mínima (anos)
            </dt>
            <dd className="mt-1 flex   text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.experience}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Competências desejadas
            </dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.vacanciesCompetences?.map((item, index) => (
                <h3 key={index}>{`${item.competence.designation}; `}</h3>
              ))}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Benéficios</dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.vacanciesBenefits?.map((item, index) => (
                <h3
                  className="mr-2"
                  key={index}
                >{` ${item.benefit.designation};  `}</h3>
              ))}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex">
              <ClockIcon
                className=" h-5 w-5 text-gray-400 mr-2"
                aria-hidden="true"
              />
              Data limite
            </dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Até - {formateDate(vacancie?.limitDate)}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Número de vagas
            </dt>
            <dd className="mt-1  flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.numVacancies}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm flex font-medium text-gray-500">
              <FlagIcon
                className=" h-5 w-5 text-gray-400 mr-2"
                aria-hidden="true"
              />
              Língua Referida
            </dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.vacanciesLanguages?.map((item, index) => (
                <h3 key={index}>{`${item.language.designation}; `}</h3>
              ))}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm flex font-medium text-gray-500">
              <MapIcon
                className=" h-5 w-5 text-gray-400 mr-2"
                aria-hidden="true"
              />
              Província de trabalho
            </dt>
            <dd className="mt-1 text-sm flex  text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.province?.designation}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Aptidões necessárias
            </dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.skills?.split(',')?.map((item, index) => (
                <h3 key={index}>{`${item}; `}</h3>
              ))}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Sobrea vaga</dt>
            <dd className="mt-1 flex  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.details}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm flex font-medium text-gray-500">
              <PaperClipIcon
                className=" h-5 w-5 text-gray-400 mr-2"
                aria-hidden="true"
              />
              Anexos Necessário
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"></dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default VacanciesDetails
