import { api } from '../api'
import { JobsTypeList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getJobsType = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: JobsTypeList
    })

    const { data } = res.data

    const collection = data!['JobsTypeList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
