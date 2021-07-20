import React from 'react'

// import { Container } from './styles';

import { useForm } from 'react-hook-form'
import { useAsyncState } from 'just-hook'
import { TextField } from '@components/fields'
import { useRouter } from 'next/router'
import { getCompany, updateCompany } from '@services/company'
import { ICompanyData } from '@services/company/types'
import toast, { Toaster } from 'react-hot-toast'
import { Hr, InfoText } from '../styles'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth'
import { ICompanyAttributes } from '@itypes/index'
import { PencilIcon } from '@heroicons/react/outline'

type ResetPassWordData = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, reset } = useForm()
  const {
    loading,
    setLoading,
    data,
    setData
  } = useAsyncState<ICompanyAttributes>()
  const { reload } = useRouter()
  const { user, resetPassword } = useContext(AuthContext)

  const onSubmit = async (formData: ResetPassWordData) => {
    setLoading(true)

    const { confirmPassword, currentPassword, newPassword } = formData

    try {
      if (
        currentPassword === newPassword ||
        currentPassword === confirmPassword
      )
        throw new Error(
          'A senha atual deve ser diferente com a nova senha ou a senha de confirmação'
        )
      else if (newPassword !== confirmPassword)
        throw new Error(
          'A nova senha não deve ser diferente dá senha de confirmação'
        )
      await resetPassword({
        userName: user.userName,
        password: newPassword
      })

      toast.success('Senha atualizada com sucesso.', {
        duration: 4000,
        position: 'top-right'
      })
    } catch (error) {
      toast.error(error.message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#d85959',
          color: '#fff'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const getUserInfo = useCallback(async () => {
    if (!user?.companyId) return

    const res = await getCompany(user?.companyId)
    setData(res)
  }, [user])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return (
    <div className="md:grid md:grid-cols-2">
      <Toaster />
      <div className="md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <InfoText>Alterar a senha</InfoText>
          </div>
          <div className=" px-5 py-5 bg-white ">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <TextField
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  {...register('currentPassword')}
                  required
                  className="rounded relative block w-full px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=""
                  labelName="Senha atual"
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <TextField
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  {...register('newPassword')}
                  required
                  placeholder=""
                  className="rounded relative block w-full px-3  border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  labelName="Nova senha"
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  required
                  className="rounded relative block w-full  px-3  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=""
                  labelName="Confirmar senha"
                />
              </div>
              <div className="col-span-4 sm:col-span-4">
                <button
                  type="submit"
                  className="inline-flex  mt-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-14 text-white"
                    aria-hidden="true"
                    style={{ color: '#fff' }}
                  />
                  {loading ? 'Processando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
