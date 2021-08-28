import { api } from '../api'
import {
  SolicitationList,
  StoreSolicitation,
  getOneSolicitation as solicitation,
  SolicitationListByCandidature as getByCandidature,
  UpdateSolicitation
} from './queries'
import { ISolicitationAttributes, HttpResponse } from '@itypes/index'

export const getSolicitation = async (
  id: string
): Promise<HttpResponse<ISolicitationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: SolicitationList(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'SolicitationList'
    ] as Array<ISolicitationAttributes>

    return {
      data: collection,
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

export const getOneSolicitation = async (
  id: string
): Promise<HttpResponse<ISolicitationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: solicitation(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['Solicitation'] as ISolicitationAttributes

    return {
      data: collection,
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

export const SolicitationListByCandidature = async (
  id: string
): Promise<HttpResponse<ISolicitationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: getByCandidature(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'SolicitationListByCandidature'
    ] as Array<ISolicitationAttributes>

    return {
      data: collection,
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

export const postSolicitation = async (
  formData: ISolicitationAttributes
): Promise<HttpResponse<ISolicitationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreSolicitation,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'CreateSolicitation'
    ] as Array<ISolicitationAttributes>

    return {
      data: collection,
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

export const editSolicitation = async (
  formData: ISolicitationAttributes
): Promise<HttpResponse<ISolicitationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: UpdateSolicitation,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'UpdateSolicitation'
    ] as Array<ISolicitationAttributes>

    return {
      data: collection,
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
