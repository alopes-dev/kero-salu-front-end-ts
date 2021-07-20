import { api } from '../api'
import {
  CompanyList,
  StoreCompany,
  CompanyOne,
  CancelCompany,
  UpdateCompany
} from './queries'
import {
  HttpResponse,
  ICompanyAttributes,
  ResponseInner,
  ResponseLess
} from '@itypes/index'
import { ICompanyData } from './types'

export const getCompany = async (): Promise<ResponseLess> => {
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

export const getOneCompany = async (
  id: string
): Promise<HttpResponse<ICompanyAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: CompanyOne(id)
    })

    const { data } = res.data

    const Company = data!['Company'] as ICompanyAttributes

    return {
      data: Company,
      error: false,
      message: 'fetch successfull'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const deleteCompanys = async (
  id: string
): Promise<HttpResponse<ICompanyData>> => {
  try {
    if (!id) throw new Error('Vaga não existente')
    const res = await api.post('/graphql', {
      query: CancelCompany(id)
    })

    const { data } = res.data

    const Company = data!['CancelCompany'] as ICompanyData

    return {
      data: Company,
      error: false,
      message: 'Delete successfull'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const getAllCompany = async (): Promise<
  HttpResponse<ReadonlyArray<ICompanyAttributes>>
> => {
  try {
    const res = await api.post('/graphql', {
      query: CompanyList
    })

    const { data } = res.data

    const collection = data!['CompanyList'] as ReadonlyArray<ICompanyAttributes>

    return {
      data: collection,
      error: false,
      message: 'fetch successfull'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const postCompany = async (
  formData: ICompanyData
): Promise<HttpResponse<ICompanyData>> => {
  try {
    if (!formData.companyId) throw new Error('Erro no envio dos dados.')

    const res = await api.post('/graphql', {
      query: StoreCompany,
      variables: {
        input: formData
      }
    })

    const { data } = res.data
    return {
      data: data['CreateCompany'] as ICompanyData,
      error: false,
      message: 'Vagas cadastrada com sucesso.'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const updateCompany = async (
  formData: ICompanyData
): Promise<HttpResponse<ICompanyData>> => {
  try {
    if (!formData.id) throw new Error('Erro no envio dos dados.')

    const res = await api.post('/graphql', {
      query: UpdateCompany,
      variables: {
        input: formData
      }
    })
    console.log(res)
    const { data } = res.data
    return {
      data: data['UpdateCompany'] as ICompanyData,
      error: false,
      message: 'Vagas atualizada com sucesso.'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}
