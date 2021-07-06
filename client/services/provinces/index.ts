import { api } from '../api'
import { ProvinceList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getProvinces = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: ProvinceList
    })

    const { data } = res.data

    const collection = data!['ProvinceList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
