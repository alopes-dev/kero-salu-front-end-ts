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
  PencilIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import { IVacanciesAttributes, ResponseInner, Select } from '@itypes/index'
import { deleteVacances, updateVacancies } from '@services/vacancies'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FC } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import EditFlexible from '@components/edit-flexible'
import { transfSelect } from '../../../../../../../utils'
import { getFunctionType } from '@services/function-type'
import { getJobsType } from '@services/jobs-type'
import { getProvinces } from '@services/provinces'
import { getFormationType } from '@services/formation-type'
import { ProfissionalExperiences } from '@constants/index'
import { getCompetence } from '@services/competence'
import { getLanguage } from '@services/language'
import { getNationality } from '@services/nationalities'
import { getBenefits } from '@services/benefits'
import { postVacancies } from '@services/vacancies'
import { IVacanciesData } from '@services/vacancies/types'
import { getOffices } from '@services/office'
import { getArea } from '@services/area'
import { IoDocumentLockSharp } from 'react-icons/io5'

type VacanciesDetailProps = {
  vacancie: IVacanciesAttributes
}

const defaultSelect = (data: Array<ResponseInner>): Array<Select> => {
  if (data.length === 0 && data[0] === undefined) return []

  return data.map(item => ({
    label: item?.designation,
    value: item?.id
  }))
}

const transform = (data: Array<Object>, key: string): Array<ResponseInner> => {
  if (!data) return
  return data.map(item => ({
    designation: item[key].designation,
    id: item[key].id
  }))
}

const experienceSelected = (experience: string): Array<Select> => {
  if (!experience) return

  return [
    {
      label: experience,
      value: experience
    }
  ]
}

const VacanciesDetails: FC<VacanciesDetailProps> = ({ vacancie }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { back, push } = useRouter()
  const [areas, setAreas] = useState<ReadonlyArray<Select>>()
  const [functionTypes, setFunctionTypes] = useState<ReadonlyArray<Select>>()
  const [jobsTypes, setJobsType] = useState<ReadonlyArray<Select>>()
  const [provinces, setProvinces] = useState<ReadonlyArray<Select>>()
  const [formations, setFormations] = useState<ReadonlyArray<Select>>()
  const [competences, setCompetences] = useState<ReadonlyArray<Select>>()
  const [languages, setLanguages] = useState<ReadonlyArray<Select>>()
  const [nationalities, setNationalities] = useState<ReadonlyArray<Select>>()
  const [benefits, setBenefits] = useState<ReadonlyArray<Select>>()
  const [offices, setOffices] = useState<ReadonlyArray<Select>>()
  const { control } = useForm()

  const isMounted = useIsMounted()

  async function handleDelete() {
    const { error, message } = await deleteVacances(vacancie.id)

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

    setTimeout(() => {
      back()
    }, 3000)
  }

  const fetchArea = useCallback(async () => {
    try {
      const res = await getArea()
      if (isMounted.current) setAreas(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchFunctionType = useCallback(async () => {
    try {
      const res = await getFunctionType()
      if (isMounted.current) setFunctionTypes(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchJobsType = useCallback(async () => {
    try {
      const res = await getJobsType()
      if (isMounted.current) setJobsType(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchProvinces = useCallback(async () => {
    try {
      const res = await getProvinces()
      if (isMounted.current) setProvinces(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchFormationType = useCallback(async () => {
    try {
      const res = await getFormationType()
      if (isMounted.current) setFormations(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchCompetence = useCallback(async () => {
    try {
      const res = await getCompetence()
      if (isMounted.current) setCompetences(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchLanguage = useCallback(async () => {
    try {
      const res = await getLanguage()
      if (isMounted.current) setLanguages(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchNationality = useCallback(async () => {
    try {
      const res = await getNationality()
      if (isMounted.current) setNationalities(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchBenefits = useCallback(async () => {
    try {
      const res = await getBenefits()
      if (isMounted.current) setBenefits(transfSelect(res.data))
    } catch (error) {}
  }, [])

  const fetchOffices = useCallback(async () => {
    try {
      const res = await getOffices()
      if (isMounted.current) setOffices(transfSelect(res.data))
    } catch (error) {}
  }, [])

  useEffect(() => {
    fetchArea()
    fetchFunctionType()
    fetchJobsType()
  }, [fetchArea, fetchFunctionType, fetchJobsType])

  useEffect(() => {
    fetchProvinces()
    fetchCompetence()
    fetchFormationType()
  }, [fetchProvinces, fetchFormationType, fetchCompetence])

  useEffect(() => {
    fetchLanguage()
    fetchNationality()
    fetchBenefits()
    fetchOffices()
  }, [fetchLanguage, fetchNationality, fetchBenefits, fetchOffices])

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
          Atualizar Vaga
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
              push(`${ROUTES.VACANCIES_WITH_ID}/${vacancie.id}/details`).then()
            }
            className="inline-flex ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <IoDocumentLockSharp
              className="-ml-1 mr-2 h-5 w-5 text-white"
              aria-hidden="true"
              style={{ color: '#fff' }}
            />
            {/* {loading ? 'Processando...' : 'Salvar'} */}
            Mais detalhe
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Função</dt>
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.functionType?.designation}
              <EditFlexible
                fieldType="select"
                id="functionTypeId"
                type="select"
                required
                name="functionTypeId"
                control={control}
                options={functionTypes}
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Tipo de Contrato
            </dt>
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.job?.designation}

              <EditFlexible
                fieldType="select"
                id="jobsTypeId"
                type={'select'}
                options={jobsTypes}
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
                required
                name="jobsTypeId"
                control={control}
              />
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
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
            <dd className="mt-1 flex justify-between  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'AOA'
              }).format(vacancie?.salary)}
              <EditFlexible
                fieldType="text"
                id="salary"
                type={'text'}
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
                required
                name="salary"
                control={control}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Sector a Enquadrar
            </dt>
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.office?.designation}
              <EditFlexible
                fieldType="select"
                id="officeId"
                type={'select'}
                required
                name="officeId"
                options={offices}
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
                control={control}
              />
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
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.formationType?.designation}
              <EditFlexible
                fieldType="select"
                id="formationTypeId"
                type={'select'}
                options={formations}
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
                required
                name="formationTypeId"
                control={control}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Experiência mínima (anos)
            </dt>
            <dd className="mt-1 flex justify-between  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.experience}
              <EditFlexible
                fieldType="select"
                id="unique"
                type={'select'}
                options={[]}
                required
                name="provinceId"
                defaultValue={defaultSelect([vacancie?.province])}
                control={control}
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Competências desejadas
            </dt>
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.vacanciesCompetences?.map((item, index) => (
                <h3 key={index}>{`${item.competence.designation}; `}</h3>
              ))}
              <EditFlexible
                fieldType="select"
                id="unique"
                type={'select'}
                options={[]}
                required
                name="provinceId"
                defaultValue={defaultSelect([vacancie?.province])}
                control={control}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Benéficios</dt>
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.vacanciesBenefits?.map((item, index) => (
                <h3 key={index}>{`${item.benefit.designation};`}</h3>
              ))}
              <EditFlexible
                fieldType="select"
                id="benefits"
                type={'select'}
                required
                name="benefits"
                defaultValue={defaultSelect([vacancie?.province])}
                control={control}
              />
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
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              Até - {vacancie?.limitDate}
              <EditFlexible
                fieldType="date"
                id="limitDate"
                type={'date'}
                required
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
                name="limitDate"
                control={control}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Número de vagas
            </dt>
            <dd className="mt-1  flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.numVacancies}
              <EditFlexible
                fieldType="number"
                id="numVacancies"
                type={'number'}
                required
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
                name="numVacancies"
                control={control}
              />
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
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.vacanciesLanguages?.map((item, index) => (
                <h3 key={index}>{`${item.language.designation}; `}</h3>
              ))}
              <EditFlexible
                fieldType="select"
                id="unique"
                type={'select'}
                options={[]}
                required
                name="provinceId"
                defaultValue={defaultSelect([vacancie?.province])}
                control={control}
              />
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
            <dd className="mt-1 text-sm flex justify-between text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.province?.designation}
              <EditFlexible
                fieldType="select"
                id="provinceId"
                type={'select'}
                options={provinces}
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
                required
                name="provinceId"
                control={control}
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Aptidões necessárias
            </dt>
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.skills?.split(',')?.map((item, index) => (
                <h3 key={index}>{`${item}; `}</h3>
              ))}
              <EditFlexible
                fieldType="select"
                id="unique"
                type={'select'}
                options={[]}
                required
                name="provinceId"
                defaultValue={defaultSelect([vacancie?.province])}
                control={control}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Sobrea vaga</dt>
            <dd className="mt-1 flex justify-between text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {vacancie?.details}
              <EditFlexible
                fieldType="text"
                id="details"
                type={'text'}
                required
                onSubmit={updateVacancies}
                entityId={vacancie?.id}
                name="details"
                control={control}
              />
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
