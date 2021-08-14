import { api } from '../api'
import { HobbesList, StoreHobbes } from './queries'
import { IHobbesAttributes, HttpResponse } from '@itypes/index'

export const getHobbes = async (
  id: string
): Promise<HttpResponse<IHobbesAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: HobbesList(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['HobbesList'] as Array<IHobbesAttributes>

    return {
      data: collection,
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

export const postHobbes = async (
  formData: IHobbesAttributes
): Promise<HttpResponse<IHobbesAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreHobbes,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['HobbesList'] as Array<IHobbesAttributes>

    return {
      data: collection,
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
