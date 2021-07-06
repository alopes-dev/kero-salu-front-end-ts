import { api } from '../api'
import { CompanyList, StoreCompany } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'
import { ICompanyData } from './types'

export const getCompanies = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: CompanyList
    })

    const { data } = res.data

    const collection = data!['CompanyList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}

export const postCompany = async (formData: ICompanyData): Promise<string> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreCompany,
      variables: {
        input: formData
      }
    })

    const { data } = res.data

    return data!['CreateCompany']
  } catch (error) {
    return error.message
  }
}
