import { api } from '../api'
import { FormationTypesList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getFormationType = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: FormationTypesList
    })

    const { data } = res.data

    const collection = data!['FormationTypesList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
