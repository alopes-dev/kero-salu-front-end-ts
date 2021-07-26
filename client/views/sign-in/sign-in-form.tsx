import React from 'react'

import { LockClosedIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { useAsyncState } from 'just-hook'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth'
import { SignInData } from 'types/user'
import { TextField } from '@components/fields'
import theme from '@styles/theme'
import { ROUTES } from '@constants/routes'
import { useRouter } from 'next/router'

import toast, { Toaster } from 'react-hot-toast'
import useIsMounted from '@client/hooks/use-is-mounted'
export type SignInFormProps = {
  agent?: string
}

const getProvider = (agent: string) => {
  console.log(agent)
  if (agent === 'Candidato') return 1
  else if (agent === 'Seguradora') return 0
  else return 3
}

const SignInForm: React.FC<SignInFormProps> = ({ agent }) => {
  const { register, handleSubmit } = useForm()
  const { loading, setLoading } = useAsyncState()
  const { push } = useRouter()
  const { signIn } = useContext(AuthContext)
  const isMounted = useIsMounted()

  const onSubmit = async ({ password, userName }: SignInData) => {
    setLoading(true)
    try {
      await signIn({
        password,
        userName,
        provider: getProvider(agent)
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
      if (isMounted.current) setLoading(false)
    }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <input type="hidden" {...register('remember')} name="remember" />
      <div className="rounded-md shadow-sm -space-y-px">
        <TextField
          id="userName"
          name="userName"
          type="text"
          {...register('userName')}
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="username"
        />

        <TextField
          id="password"
          name="password"
          type="password"
          {...register('password')}
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="password"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a
            href="#"
            onClick={() => push(ROUTES.SIGN_UP).then()}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Criar nova conta
          </a>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
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
            <LockClosedIcon
              className="h-5 w-5 text-indigo-400 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          {loading ? 'laoding...' : 'Sign in'}
        </button>
      </div>
    </form>
  )
}

export default SignInForm
