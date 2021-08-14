import { api } from '../api'
import {
  DeletePersonLanguage,
  LanguageList,
  PersonLanguageList,
  StoreLanguage
} from './queries'
import { HttpResponse, ResponseInner, ResponseLess } from '@itypes/index'

type PersonLanguage = {
  id?: string
  personId: string
  languageId: string
}

export const getLanguage = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: LanguageList
    })

    const { data } = res.data

    const collection = data!['LanguageList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}

export const getPersonLanguage = async (id: string): Promise<any> => {
  try {
    const res = await api.post('/graphql', {
      query: PersonLanguageList(id)
    })

    const { data } = res.data

    const collection = data!['PersonLanguageList'] as Array<PersonLanguage>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}

export const postPersonLanguage = async (
  formData: PersonLanguage
): Promise<HttpResponse<PersonLanguage>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreLanguage,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const result = data!['CreatePersonLanguage'] as { id: string }

    return {
      data: result,
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

export const removePersonLanguage = async (
  id: string
): Promise<HttpResponse<PersonLanguage>> => {
  try {
    const res = await api.post('/graphql', {
      query: DeletePersonLanguage,
      variables: {
        id
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const result = data!['DeletePersonLanguage'] as { id: string }

    return {
      data: result,
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
