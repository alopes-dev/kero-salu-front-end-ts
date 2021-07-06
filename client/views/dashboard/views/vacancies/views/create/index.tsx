import {
  TextField,
  SelectField,
  SelectFieldSelectable
} from '@components/fields'
import { SaveAsIcon } from '@heroicons/react/solid'
import { getArea } from '@services/area'
import { useContext, useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ResponseInner, Select } from '@itypes/index'
import useIsMounted from '@client/hooks/use-is-mounted'
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
import { AuthContext } from '@contexts/auth'
import toast, { Toaster } from 'react-hot-toast'
import { useAsyncState } from 'just-hook'
import { FC } from 'react'
import { CreateVacanciesViewProps } from './types'
import { PencilIcon } from '@heroicons/react/outline'

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

const CreateVacancieView: FC<CreateVacanciesViewProps> = ({ vacancie }) => {
  const { user } = useContext(AuthContext)
  const { loading, setLoading } = useAsyncState()
  const isEditable = !!vacancie
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

  const profissionalExpiriences = Object.keys(ProfissionalExperiences).map(
    item => ({
      value: ProfissionalExperiences[item],
      label: ProfissionalExperiences[item]
    })
  )

  const { register, handleSubmit, control, reset } = useForm()
  const isMounted = useIsMounted()

  const handleSave = async (vacancies: IVacanciesData) => {
    setLoading(true)

    vacancies.companyId = user.id

    const { error, message } = await postVacancies(vacancies)

    if (isMounted.current) setLoading(false)

    if (error)
      return toast.error(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#d85959',
          color: '#fff'
        }
      })

    toast.success(message, {
      duration: 4000,
      position: 'top-right'
    })

    reset()
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

  const iconAction = () =>
    isEditable ? (
      <PencilIcon
        className="-ml-1 mr-2 h-5 w-5 text-white"
        aria-hidden="true"
        style={{ color: '#fff' }}
      />
    ) : (
      <SaveAsIcon
        className="-ml-1 mr-2 h-5 w-5 text-white"
        aria-hidden="true"
        style={{ color: '#fff' }}
      />
    )

  return (
    <div className="md:grid md:grid-cols-2">
      <Toaster />
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div
              style={{ justifyContent: 'space-between' }}
              className="px-4 py-3 flex bg-gray-50 text-right sm:px-6"
            >
              <h2 className="text-2xl font-bold leading-7 text-indigo-600 sm:text-3xl sm:truncate">
                {isEditable ? 'Editar a vaga' : 'Nova vaga'}
              </h2>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {iconAction()}
                {loading ? 'Processando...' : isEditable ? 'Editar' : 'Salvar'}
              </button>
            </div>
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={functionTypes}
                    labelName="Tipo de função"
                    name="functionTypeId"
                    // defaultValue={defaultSelect([vacancie?.functionType])}
                    control={control}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={areas}
                    labelName="Área funcional (escolha até 3 áreas)"
                    name="areas"
                    control={control}
                    // defaultValue={defaultSelect(
                    //   transform(vacancie?.vacanciesAreas, 'area')
                    // )}
                    isMulti={true}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={jobsTypes}
                    labelName="Tipo de Contrato"
                    name="jobsTypeId"
                    // defaultValue={defaultSelect([vacancie?.job])}
                    control={control}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <TextField
                    id="city"
                    name="city"
                    // defaultValue={vacancie?.city}
                    labelName="Cidade"
                    type="text"
                    {...register('city')}
                    required
                    className="appearance-none mt-1  rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Luanda"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={offices}
                    // defaultValue={defaultSelect([vacancie?.office])}
                    labelName="Sector à enquadrar"
                    name="officeId"
                    control={control}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={formations}
                    // defaultValue={defaultSelect([vacancie?.formationType])}
                    labelName="Formação académica"
                    name="formationTypeId"
                    control={control}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={profissionalExpiriences}
                    labelName="Experiência mínima (anos)"
                    // defaultValue={experienceSelected(vacancie?.experience)}
                    name="experience"
                    control={control}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={competences}
                    labelName="Competências desejadas"
                    name="competences"
                    control={control}
                    // defaultValue={defaultSelect(
                    //   transform(vacancie?.vacanciesCompetences, 'competence')
                    // )}
                    isMulti={true}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={benefits}
                    labelName="Benéficios"
                    control={control}
                    name="benefits"
                    // defaultValue={defaultSelect(
                    //   transform(vacancie?.vacanciesBenefits, 'benefit')
                    // )}
                    isMulti={true}
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Aptidões necessárias
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="skills"
                      name="skills"
                      rows={3}
                      className="shadow-sm focus.ring-indigo-500 focus.border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Adicione aqui as principais aptidões que os candidatos devem ter, e separar por virgulas"
                      // defaultValue={vacancie?.skills}
                      {...register('skills')}
                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <TextField
                    id="salary"
                    name="salary"
                    labelName="Sálario ofericido"
                    // defaultValue={`${vacancie?.salary}`}
                    type="text"
                    {...register('salary')}
                    required
                    className="appearance-none mt-1 text-right rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="AO 00.00"
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <TextField
                    id="showSalary"
                    name="showSalary"
                    labelName=" Mostrar salário"
                    type="text"
                    {...register('showSalary')}
                    required
                    className="appearance-none mt-1 text-right rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="UMA CHECKBOX"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <TextField
                    id="limitDate"
                    name="limitDate"
                    labelName="Data limite"
                    // defaultValue={vacancie?.limitDate}
                    type="date"
                    {...register('limitDate')}
                    required
                    className="appearance-none text-right mt-1 rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="AO 00.00"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <TextField
                    id="city"
                    name="numVacancies"
                    labelName="Número de vagas"
                    // defaultValue={Number(vacancie?.numVacancies)}
                    type="number"
                    {...register('numVacancies')}
                    required
                    className="appearance-none mt-1  rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="10"
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={provinces}
                    labelName="Provincia"
                    name="provinceId"
                    // defaultValue={defaultSelect([vacancie?.province])}
                    control={control}
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <TextField
                    id="limitHours"
                    name="limitHours"
                    labelName="Carga Horária"
                    // defaultValue={vacancie?.limitHours}
                    type="text"
                    {...register('limitHours')}
                    required
                    className="appearance-none  mt-1 rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder=""
                  />
                </div>

                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={languages}
                    labelName="Língua Referida"
                    name="languages"
                    control={control}
                    // defaultValue={defaultSelect(
                    //   transform(vacancie?.vacanciesLanguages, 'language')
                    // )}
                    isMulti={true}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <SelectFieldSelectable
                    options={nationalities}
                    labelName="Nacionalidade Referida"
                    name="nationalityId"
                    // defaultValue={defaultSelect([vacancie?.nationality])}
                    control={control}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sobrea vaga
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="details"
                    rows={3}
                    className="shadow-sm focus.ring-indigo-500 focus.border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="sobre a vaga..."
                    // defaultValue={vacancie?.details}
                    {...register('details')}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateVacancieView
