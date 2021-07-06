import { v4 as uuid } from 'uuid'
import { api } from './api'

type SignInRequestData = {
  userName: string
  password: string
  provider?: number
}

const GQL = `mutation($input: SessionInput){
  StoreSession(input: $input){
    token
    user{
      userName
      email
      avatarUrl
      companyId
    }
  }
}`

const recoverUser = (token: string) => `query{
  RecoverSessions(token:"${token}"){
    token
    user {
      provider
      email
      userName
      personId
      companyId
      avatarUrl
    }
  }
}`

export async function signInRequest({
  password,
  userName,
  provider
}: SignInRequestData) {
  try {
    const res = await api.post('/graphql', {
      query: GQL,
      variables: {
        input: {
          provider,
          userName,
          password
        }
      }
    })

    const { data, errors } = res.data

    if (!data['StoreSession']) throw new Error(errors[0].message)

    return data['StoreSession']
  } catch (error) {
    return error.message
  }
}

export async function recoverUserInformation(token: string) {
  recoverUser
  try {
    const res = await api.post('/graphql', {
      query: recoverUser(token)
    })

    const { data, errors } = res.data

    if (!data['RecoverSessions']) throw new Error(errors[0].message)

    return data['RecoverSessions']
  } catch (error) {
    return error.message
  }
}
