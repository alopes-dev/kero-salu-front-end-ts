import React, { useEffect } from 'react'

import { SaveAsIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { useAsyncState } from 'just-hook'
import { TextField } from '@components/fields'
import theme from '@styles/theme'
import { useRouter } from 'next/router'
import { getPerson, updatePerson } from '@services/person'
import toast, { Toaster } from 'react-hot-toast'
import { toastSuccessProps, toastErrorProps } from '@constants/index'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth'
import { UpdateUserAccount } from '@services/user-account/index'
import { useCallback } from 'react'
import { IPersonAttributes } from '@itypes/index'
import { resetPasswordRequest } from '@services/auth'

type PersonFormData = {
  lastName: string
  birthDate: string
  email: string
  password: string
  firstName: string
  userName?: string
}

type ResetPasswordType = {
  old: string
  newPassword: string
  confirm: string
} & PersonFormData
const SignUpForm: React.FC<{ formActive: string }> = ({ formActive }) => {
  const { register, handleSubmit, reset } = useForm()
  const {
    loading,
    setLoading,
    data,
    setData
  } = useAsyncState<IPersonAttributes>()
  const { back } = useRouter()
  const { user, setUser } = useContext(AuthContext)

  const handleResetPassword = async ({
    old,
    newPassword,
    confirm
  }: ResetPasswordType) => {
    try {
      if (old === newPassword)
        throw new Error('Senha antiga não deve ser igual a nova')
      if (confirm !== newPassword) throw new Error('A nova senha não confirma')

      await resetPasswordRequest({
        password: newPassword,
        userName: user.userName
      })

      toast.success('Senha atualizada.', toastSuccessProps)

      setTimeout(() => back(), 2000)
    } catch (error) {
      return error
    }
  }
  const onSubmit = async (formData: ResetPasswordType) => {
    setLoading(true)
    try {
      const { lastName, birthDate, email, userName, firstName } = formData

      if (formActive === 'RESET_PW') return handleResetPassword(formData)

      const { error, message, data: res } = await updatePerson({
        lastName,
        birthDate,
        firstName,
        id: user.personId
      })

      await UpdateUserAccount({
        id: user.id,
        email,
        userName
      })

      if (error) return toast.error(message, toastErrorProps)

      setUser({
        ...user,
        email,
        userName
      })
      toast.success('Candidato atualizado.', toastSuccessProps)

      setTimeout(() => back(), 2000)
    } catch (error) {
      toast.error(error.message, toastErrorProps)
    } finally {
      setLoading(false)
    }
  }

  const fetUserInfo = useCallback(async () => {
    if (user) {
      const res = await getPerson(`${user.personId}`)
      setData(res)
    }
  }, [user])

  useEffect(() => {
    fetUserInfo()
  }, [fetUserInfo])

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />

      <div className="rounded-md shadow-sm -space-y-px">
        {formActive === 'RESET_PW' ? (
          <>
            <TextField
              id="old"
              name="old"
              type="password"
              {...register('old')}
              required
              className="rounded mb-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="senha antiga"
            />
            <TextField
              id="newPassword"
              name="newPassword"
              type="password"
              {...register('newPassword')}
              required
              className="rounded mb-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nova senha"
            />
            <TextField
              id="confirm"
              name="confirm"
              type="password"
              {...register('confirm')}
              required
              className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="confirmar nova senha"
            />
          </>
        ) : (
          <>
            <TextField
              id="firstName"
              name="firstName"
              type="text"
              {...register('firstName')}
              required
              className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Nome  "
              defaultValue={data?.firstName}
            />
            <TextField
              id="lastName"
              name="lastName"
              type="text"
              {...register('lastName')}
              required
              className="rounded relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Último nome"
              defaultValue={data?.lastName}
            />
            <TextField
              id="birthDate"
              name="birthDate"
              type="date"
              {...register('birthDate')}
              required
              className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Data de nascimento"
              defaultValue={data?.birthDate}
            />
            <TextField
              id="email"
              name="email"
              type="text"
              {...register('email')}
              required
              className="rounded relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              defaultValue={user?.email}
            />
            <TextField
              id="userName"
              name="userName"
              type="text"
              {...register('userName')}
              required
              className="rounded relative block w-full my-3 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="username"
              defaultValue={user?.userName}
            />
          </>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          style={{
            background: theme.colors.primary
          }}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <SaveAsIcon
              className="h-5 w-5 text-indigo-400 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          {loading ? 'laoding...' : 'Atualizar os dados'}
        </button>
      </div>
    </form>
  )
}

export default SignUpForm
