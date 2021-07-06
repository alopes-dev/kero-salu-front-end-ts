import { api } from '../api'
import { LanguageList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

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
