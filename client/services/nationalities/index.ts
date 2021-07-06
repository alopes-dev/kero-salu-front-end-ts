import { api } from '../api'
import { NationalityList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getNationality = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: NationalityList
    })

    const { data } = res.data

    const collection = data!['NationalityList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
