import { api } from '../api'
import { isFavoriteJobs } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

type isFavoriteJobsResponseType = {
  id?: string
  vacanciesId: string
  candidateId: string
}

type Response = {
  data: isFavoriteJobsResponseType
  total: number
}

export const checkFavoriteJobs = async ({
  vacanciesId,
  candidateId
}: isFavoriteJobsResponseType): Promise<Response> => {
  try {
    const res = await api.post('/graphql', {
      query: isFavoriteJobs({
        vacanciesId,
        candidateId
      })
    })

    const { data } = res.data

    const collection = data!['FavoriteJobsOne'] as isFavoriteJobsResponseType
    return {
      data: collection,
      total: 1
    }
  } catch (error) {
    return error.message
  }
}
