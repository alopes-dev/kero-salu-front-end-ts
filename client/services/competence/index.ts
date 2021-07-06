import { api } from '../api'
import { CompetenceList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getCompetence = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: CompetenceList
    })

    const { data } = res.data

    const collection = data!['CompetenceList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
