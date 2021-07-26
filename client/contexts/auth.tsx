import { createContext, useCallback, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

import {
  recoverUserInformation,
  resetPasswordRequest,
  signInRequest
} from '../services/auth'
import { api } from '../services/api'
import { SignInData, User } from '../../types/user'
import useIsMounted from '@client/hooks/use-is-mounted'

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
  resetPassword: (data: Omit<SignInData, 'provider'>) => Promise<void>
  signOut(): void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const { push, reload } = useRouter()
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

    const path = provider === 1 ? '/mobile' : '/dashboard'

    push(path).then()
  }

  async function resetPassword({
    userName,
    password
  }: Omit<SignInData, 'provider'>) {
    return await resetPasswordRequest({
      userName,
      password
    })
  }

  function signOut() {
    destroyCookie({}, 'nextauth.token', {
      path: '/'
    })
    reload()
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, resetPassword, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
