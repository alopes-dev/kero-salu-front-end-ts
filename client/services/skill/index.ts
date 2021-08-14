import { api } from '../api'
import { SkillList, StoreSkill } from './queries'
import { ISkillAttributes, HttpResponse } from '@itypes/index'

export const getSkill = async (
  id: string
): Promise<HttpResponse<ISkillAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: SkillList(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['SkillList'] as Array<ISkillAttributes>

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

export const postSkill = async (
  formData: ISkillAttributes
): Promise<HttpResponse<ISkillAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreSkill,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['SkillList'] as Array<ISkillAttributes>

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
