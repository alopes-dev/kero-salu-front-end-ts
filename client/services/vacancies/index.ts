import { api } from '../api'
import {
  VacanciesList,
  StoreVacancies,
  vacanceOne,
  CancelVacance
} from './queries'
import {
  HttpResponse,
  IVacanciesAttributes,
  ResponseInner,
  ResponseLess
} from '@itypes/index'
import { IVacanciesData } from './types'

export const getVacancies = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: VacanciesList
    })

    const { data } = res.data

    const collection = data!['VacanciesList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}

export const getOneVacance = async (
  id: string
): Promise<HttpResponse<IVacanciesAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: vacanceOne(id)
    })

    const { data } = res.data

    const vacance = data!['Vacancies'] as IVacanciesAttributes

    return {
      data: vacance,
      error: false,
      message: 'fetch successfull'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const deleteVacances = async (
  id: string
): Promise<HttpResponse<IVacanciesData>> => {
  try {
    if (!id) throw new Error('Vaga não existente')
    const res = await api.post('/graphql', {
      query: CancelVacance(id)
    })

    const { data } = res.data

    const vacance = data!['CancelVacancies'] as IVacanciesData

    return {
      data: vacance,
      error: false,
      message: 'Delete successfull'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const getAllVacancies = async (): Promise<
  HttpResponse<ReadonlyArray<IVacanciesAttributes>>
> => {
  try {
    const res = await api.post('/graphql', {
      query: VacanciesList
    })

    const { data } = res.data

    const collection = data![
      'VacanciesList'
    ] as ReadonlyArray<IVacanciesAttributes>

    return {
      data: collection,
      error: false,
      message: 'fetch successfull'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const postVacancies = async (
  formData: IVacanciesData
): Promise<HttpResponse<IVacanciesData>> => {
  try {
    if (!formData.companyId) throw new Error('Erro no envio dos dados.')

    const res = await api.post('/graphql', {
      query: StoreVacancies,
      variables: {
        input: formData
      }
    })

    const { data } = res.data
    return {
      data: data['CreateVacancies'] as IVacanciesData,
      error: false,
      message: 'Vagas cadastrada com sucesso.'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}
