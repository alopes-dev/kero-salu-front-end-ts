import { createContext, useCallback, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router'

import { recoverUserInformation, signInRequest } from '../services/auth'
import { api } from '../services/api'
import { SignInData, User } from '../../types/user'
import useIsMounted from '@client/hooks/use-is-mounted'

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const { push } = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const isMounted = useIsMounted()

  const isAuthenticated = !!user

  const handleRecoverUserInfo = useCallback(async () => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      const response = await recoverUserInformation(token)

      if (isMounted.current) setUser(response.user)
    }
  }, [isMounted])

  useEffect(() => {
    // TODO : Recovery user information
    handleRecoverUserInfo()
  }, [handleRecoverUserInfo])

  async function signIn({ userName, provider, password }: SignInData) {
    const { token, user } = await signInRequest({
      userName,
      provider,
      password
    })

    if (!token) throw new Error('Sem autorização.')

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`
    user['id'] = user.companyId
    setUser(user)

    push('/dashboard').then()
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
