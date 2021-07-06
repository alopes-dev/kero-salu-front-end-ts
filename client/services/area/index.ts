import { api } from '../api'
import { AreaList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getArea = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: AreaList
    })

    const { data } = res.data

    const collection = data!['AreaList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
