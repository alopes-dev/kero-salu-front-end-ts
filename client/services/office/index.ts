import { api } from '../api'
import { OfficeList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getOffices = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: OfficeList
    })

    const { data } = res.data

    const collection = data!['OfficeList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
