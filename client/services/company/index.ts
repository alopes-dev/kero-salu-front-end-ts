import { api } from '../api'
import { CompanyById, CompanyList, patchCompany, StoreCompany } from './queries'
import { ICompanyAttributes, ResponseInner, ResponseLess } from '@itypes/index'
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

export const getCompany = async (id: string): Promise<ICompanyAttributes> => {
  try {
    const res = await api.post('/graphql', {
      query: CompanyById(id)
    })

    const { data } = res.data

    const collection = data!['Company'] as ICompanyAttributes

    return collection
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

export const updateCompany = async (
  formData: ICompanyData
): Promise<string> => {
  try {
    const res = await api.post('/graphql', {
      query: patchCompany,
      variables: {
        input: formData
      }
    })

    const { data } = res.data

    return data!['UpdateCompany']
  } catch (error) {
    return error.message
  }
}
