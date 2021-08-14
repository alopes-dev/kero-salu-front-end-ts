import { api } from '../api'
import { ExperienceList, StoreExperience } from './queries'
import { IExperienceAttributes, HttpResponse } from '@itypes/index'

export const getExperience = async (
  id: string
): Promise<HttpResponse<IExperienceAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: ExperienceList(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['ExperienceList'] as Array<IExperienceAttributes>

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

export const postExperience = async (
  formData: IExperienceAttributes
): Promise<HttpResponse<IExperienceAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreExperience,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['ExperienceList'] as Array<IExperienceAttributes>

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
