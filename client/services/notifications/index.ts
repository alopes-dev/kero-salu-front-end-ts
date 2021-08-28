import { api } from '../api'
import {
  NotificationList,
  StoreNotification,
  getOneNotification as Notification,
  NotificationListByCandidature as getByCandidature,
  UpdateNotification,
  NotificationsByOrigin,
  NotificationsByDistination
} from './queries'
import { INotificationAttributes, HttpResponse } from '@itypes/index'

export const getNotificationsByDistination = async (
  id: string
): Promise<HttpResponse<INotificationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: NotificationsByDistination(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'NotificationsByDistinationOrAll'
    ] as Array<INotificationAttributes>

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

export const getNotificationsByOriginOrDistinationId = async (
  id: string
): Promise<HttpResponse<INotificationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: NotificationsByOrigin(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'NotificationsByOriginOrDistinationId'
    ] as Array<INotificationAttributes>

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

export const getNotification = async (): Promise<
  HttpResponse<INotificationAttributes>
> => {
  try {
    const res = await api.post('/graphql', {
      query: NotificationList
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'NotificationsList'
    ] as Array<INotificationAttributes>

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

export const getOneNotification = async (
  id: string
): Promise<HttpResponse<INotificationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: Notification(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data!['Notification'] as INotificationAttributes

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

export const NotificationListByCandidature = async (
  id: string
): Promise<HttpResponse<INotificationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: getByCandidature(id)
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'NotificationListByCandidature'
    ] as Array<INotificationAttributes>

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

export const postNotification = async (
  formData: INotificationAttributes
): Promise<HttpResponse<INotificationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: StoreNotification,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'CreateNotification'
    ] as Array<INotificationAttributes>

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

export const editNotification = async (
  formData: INotificationAttributes
): Promise<HttpResponse<INotificationAttributes>> => {
  try {
    const res = await api.post('/graphql', {
      query: UpdateNotification,
      variables: {
        input: formData
      }
    })

    const { data, errors } = res.data

    if (errors) throw new Error(errors[0]?.message || 'Ocorreu algum erro')

    const collection = data![
      'UpdateNotification'
    ] as Array<INotificationAttributes>

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
