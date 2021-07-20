import { api } from '../api'
import { BenefitList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getBenefits = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: BenefitList
    })

    const { data } = res.data

    const collection = data!['benefitList'] as Array<ResponseInner>
    return {
      data: collection.map(item => ({ ...item, id: item.id })),
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
