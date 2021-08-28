import { api } from '../api'
import { DocumentTypesList } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

export const getDocumentType = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: DocumentTypesList
    })

    const { data } = res.data

    const collection = data!['DocumentTypesList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}
