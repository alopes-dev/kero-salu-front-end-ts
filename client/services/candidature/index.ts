import { api } from '../api'
import {
  CandidatureList,
  StoreCandidature,
  CandidatureOne,
  CancelCandidature,
  UpdateCandidature,
  VerifyCandidature
} from './queries'
import {
  HttpResponse,
  ICandidatureAttributes,
  ResponseInner,
  ResponseLess
} from '@itypes/index'
import { ICandidatureData, IVerify } from './types'

export const getCandidature = async (): Promise<ResponseLess> => {
  try {
    const res = await api.post('/graphql', {
      query: CandidatureList
    })

    const { data } = res.data

    const collection = data!['CandidatureList'] as Array<ResponseInner>

    return {
      data: collection,
      total: collection.length
    }
  } catch (error) {
    return error.message
  }
}

export const getOneCandidature = async (
  id: string
): Promise<HttpResponse<ICandidatureAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: CandidatureOne(id)
    })

    const { data } = res.data

    const Candidature = data!['Candidature'] as ICandidatureAttributes

    return {
      data: Candidature,
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

export const deleteCandidatures = async (
  id: string
): Promise<HttpResponse<ICandidatureData>> => {
  try {
    if (!id) throw new Error('Vaga não existente')
    const res = await api.post('/graphql', {
      query: CancelCandidature(id)
    })

    const { data } = res.data

    const Candidature = data!['CancelCandidature'] as ICandidatureData

    return {
      data: Candidature,
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

export const getAllCandidature = async (): Promise<
  HttpResponse<ReadonlyArray<ICandidatureAttributes>>
> => {
  try {
    const res = await api.post('/graphql', {
      query: CandidatureList
    })

    const { data } = res.data

    const collection = data![
      'CandidatureList'
    ] as ReadonlyArray<ICandidatureAttributes>

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

export const postCandidature = async (
  formData: ICandidatureData
): Promise<HttpResponse<ICandidatureData>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreCandidature,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')
    return {
      data: data['CreateCandidature'] as ICandidatureData,
      error: false,
      message: 'Candidatura feita com sucesso.'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const verifyCandidature = async (
  formData: ICandidatureData
): Promise<HttpResponse<IVerify>> => {
  try {
    const res = await api.post('/graphql', {
      query: VerifyCandidature,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')
    return {
      data: data['VerifyCandidature'] as IVerify,
      error: false,
      message: 'Success'
    }
  } catch (error) {
    return {
      data: null,
      error: true,
      message: error.message
    }
  }
}

export const updateCandidature = async (
  formData: ICandidatureData
): Promise<HttpResponse<ICandidatureData>> => {
  try {
    if (!formData.id) throw new Error('Erro no envio dos dados.')

    const res = await api.post('/graphql', {
      query: UpdateCandidature,
      variables: {
        input: formData
      }
    })
    console.log(res)
    const { data } = res.data
    return {
      data: data['UpdateCandidature'] as ICandidatureData,
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
