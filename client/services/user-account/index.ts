import { api } from '../api'
import { UpdateUserAccount as update } from './queries'
import { ResponseInner, ResponseLess } from '@itypes/index'

type UserUpdateProfile = {
  id: string
  photoUrl?: string
  userName?: string
  email?: string
  password?: string
  oldPassword?: string
}
export const UpdateUserAccount = async (
  user: UserUpdateProfile
): Promise<any> => {
  try {
    const res = await api.post('/graphql', {
      query: update,
      variables: {
        input: user
      }
    })

    const { data } = res.data

    return data!['UpdateUserAccount']
  } catch (error) {
    return error.message
  }
}
