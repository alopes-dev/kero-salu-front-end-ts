import useIsMounted from '@client/hooks/use-is-mounted'
import { SelectFieldSelectable, TextField } from '@components/fields'
import { toastErrorProps, toastSuccessProps } from '@constants/index'
import { AuthContext } from '@contexts/auth'
import { ISkillAttributes } from '@itypes/index'
import { postSkill } from '@services/skill'
import { useAsyncState } from 'just-hook'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

type SkillFormProps = {
  setter?(): void
}

const SkillForm: React.FC<SkillFormProps> = ({ setter }) => {
  const { user } = useContext(AuthContext)
  const { register, handleSubmit, getValues } = useForm()
  const isMounted = useIsMounted()
  const { setLoading } = useAsyncState()

  const handleSave = async ({ designation, resume }: ISkillAttributes) => {
    setLoading(true)
    try {
      const { error, message, data: res } = await postSkill({
        designation,
        resume,
        candidateId: user.personId
      })

      if (error) return toast.error(message, toastErrorProps)

      toast.success('Habilidade adicionada.', toastSuccessProps)
      setTimeout(() => {
        setter()
      }, 2000)
    } catch (error) {
      toast.error(error.message, toastErrorProps)
    } finally {
      if (isMounted.current) setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Toaster />
      <div className="shadow sm:rounded-md sm:overflow-hidden mb-5">
        <div className="">
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-6 sm:col-span-6">
              <TextField
                id="designation"
                name="designation"
                type="text"
                {...register('designation')}
                required
                className="appearance-none mt-1  rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Habilidade"
              />
            </div>
          </div>
          <div>
            <div className="mt-3">
              <textarea
                id="resume"
                name="resume"
                className="shadow-sm focus.ring-indigo-500 focus.border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="sobre a habilidade..."
                {...register('resume')}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex w-full mt-5 mb-5 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ADICIONAL
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SkillForm
