import { api } from '../api'
import { CurseList, StoreCurse } from './queries'
import { ICurseOrAcademyAttributes, HttpResponse } from '@itypes/index'

export const getCurse = async (
  id: string
): Promise<HttpResponse<ICurseOrAcademyAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: CurseList(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['CurseList'] as Array<ICurseOrAcademyAttributes>

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

export const postCurse = async (
  formData: ICurseOrAcademyAttributes
): Promise<HttpResponse<ICurseOrAcademyAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreCurse,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['CurseList'] as Array<ICurseOrAcademyAttributes>

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
