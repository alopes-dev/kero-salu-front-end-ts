import { api } from '../api'
import { AcademyList, StoreAcademy } from './queries'
import { ICurseOrAcademyAttributes, HttpResponse } from '@itypes/index'

export const getAcademy = async (
  id: string
): Promise<HttpResponse<ICurseOrAcademyAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: AcademyList(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['AcademyList'] as Array<ICurseOrAcademyAttributes>

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

export const postAcademy = async (
  formData: ICurseOrAcademyAttributes
): Promise<HttpResponse<ICurseOrAcademyAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreAcademy,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['AcademyList'] as Array<ICurseOrAcademyAttributes>

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
