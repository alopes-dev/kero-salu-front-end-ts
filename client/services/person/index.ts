import { api } from '../api'
import {
  PersonById,
  PersonList,
  patchPerson,
  StorePerson,
  getAllPersonFromVacance
} from './queries'
import {
  HttpResponse,
  IPersonAttributes,
  ResponseInner,
  ResponseLess
} from '@itypes/index'
import { IPersonData } from './types'

export const getCompanies = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: PersonList
    })

    const { data } = res.data

    const collection = data!['PersonList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}

export const getPerson = async (id: string): Promise<IPersonAttributes> => {
  try {
    const res = await api.post('/graphql', {
      query: PersonById(id)
    })

    const { data } = res.data

    const collection = data!['Person'] as IPersonAttributes

    return collection
  } catch (error) {
    return error.message
  }
}

export const postPerson = async (
  formData: IPersonData
): Promise<HttpResponse<{ id: string }>> => {
  try {
    const res = await api.post('/graphql', {
      query: StorePerson,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')
    return {
      data: data['CreatePerson'] as { id: string },
      error: false,
      message: 'Success'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const updatePerson = async (formData: IPersonData): Promise<string> => {
  try {
    const res = await api.post('/graphql', {
      query: patchPerson,
      variables: {
        input: formData
      }
    })

    const { data } = res.data

    return data!['UpdatePerson']
  } catch (error) {
    return error.message
  }
}

export const getPersonFromVacance = async (
  id: string
): Promise<Array<IPersonAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: getAllPersonFromVacance(id)
    })

    const { data } = res.data
    const { candidatures } = data!['CandidatureByVacanciesId'] as {
      candidatures: Array<{ candidate: IPersonAttributes }>
    }
    const candidates = candidatures?.map(item => ({ ...item.candidate }))

    return candidates
  } catch (error) {
    return error.message
  }
}
