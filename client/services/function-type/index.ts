import { api } from '../api'
import { FunctionTypesList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getFunctionType = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: FunctionTypesList
    })

    const { data } = res.data

    const collection = data!['FunctionTypesList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
