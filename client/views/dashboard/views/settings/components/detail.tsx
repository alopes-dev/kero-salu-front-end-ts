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
import { UpdateUserAccount } from '@services/user-account'

const AccountDetails: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const {
    loading,
    setLoading,
    data,
    setData
  } = useAsyncState<ICompanyAttributes>()
  const { reload } = useRouter()
  const { user, setUser } = useContext(AuthContext)
  const getUserInfo = useCallback(async () => {
    if (!user?.companyId) return

    const res = await getCompany(user?.companyId)
    setData(res)
  }, [user])

  const onSubmit = async (formData: ICompanyData) => {
    setLoading(true)

    Object.keys(formData).forEach(item => {
      if (formData[item] === '') formData[item] = undefined
    })

    const {
      password,
      phone,
      nif,
      email,
      designation,
      mission,
      vision,
      userName
    } = formData

    try {
      await updateCompany({
        id: user.companyId,
        designation,
        email,
        nif,
        phone,
        mission,
        vision
      })

      if (userName || email) {
        await UpdateUserAccount({
          email,
          userName,
          id: user.id
        })
      }

      toast.success('Dados atualizados com sucesso.', {
        duration: 4000,
        position: 'top-right'
      })

      setTimeout(() => reload())
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

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return (
    <div className="md:grid md:grid-cols-2">
      <Toaster />
      <div className="md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <InfoText>Account Setting </InfoText>
            <button
              type="submit"
              className="inline-flex mr-5 mt-4 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon
                className="-ml-1 mr-2 h-5 w-5 text-white"
                aria-hidden="true"
                style={{ color: '#fff' }}
              />
              {loading ? 'Processando...' : 'Salvar'}
            </button>
          </div>
          <div className=" px-5 py-5 bg-white ">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <TextField
                  id="userName"
                  name="userName"
                  type="text"
                  {...register('userName')}
                  required
                  className="rounded relative block w-full px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="username"
                  defaultValue={user?.userName}
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <TextField
                  id="designation"
                  name="designation"
                  type="text"
                  {...register('designation')}
                  required
                  className="rounded relative block w-full px-3  border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Denominação  "
                  defaultValue={data?.designation}
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <TextField
                  id="nif"
                  name="nif"
                  type="text"
                  {...register('nif')}
                  required
                  className="rounded relative block w-full  px-3  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="NIF"
                  defaultValue={data?.nif}
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <TextField
                  id="phone"
                  name="phone"
                  type="text"
                  {...register('phone')}
                  required
                  className="rounded relative block w-full px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Telefone"
                  defaultValue={data?.phone}
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <TextField
                  id="email"
                  name="email"
                  type="text"
                  {...register('email')}
                  required
                  className="rounded relative block w-full  px-3  border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
              </div>
            </div>
            <Hr />
            <div className="grid mt-3 grid-cols-6 gap-6">
              <div className="col-span-3 sm:col-span-3">
                <div className="mt-1">
                  <label htmlFor="vision">Vissão</label>
                  <textarea
                    id="vision"
                    name="vision"
                    rows={3}
                    className="shadow-sm focus.ring-indigo-500 focus.border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Visão..."
                    defaultValue={data?.vision}
                    {...register('vision')}
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-3">
                <div className="mt-1">
                  <label htmlFor="mission">Missão</label>
                  <textarea
                    id="mission"
                    name="mission"
                    rows={3}
                    className="shadow-sm focus.ring-indigo-500 focus.border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Missão..."
                    defaultValue={data?.mission}
                    {...register('mission')}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountDetails
