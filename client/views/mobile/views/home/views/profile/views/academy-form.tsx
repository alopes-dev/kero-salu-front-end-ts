import useIsMounted from '@client/hooks/use-is-mounted'
import { TextField } from '@components/fields'
import { toastErrorProps, toastSuccessProps } from '@constants/index'
import { AuthContext } from '@contexts/auth'
import { ICurseOrAcademyAttributes } from '@itypes/index'
import { postAcademy } from '@services/academy'
import { useAsyncState } from 'just-hook'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

type AcademyFormProps = {
  setter?(): void
}

const AcademyForm: React.FC<AcademyFormProps> = ({ setter }) => {
  const { user } = useContext(AuthContext)
  const { register, handleSubmit, getValues } = useForm()
  const isMounted = useIsMounted()
  const { setLoading } = useAsyncState()
  const [showEndDate, setShowEndDate] = useState(false)

  const handleSave = async ({
    institute,
    title,
    untillNow,
    resume,
    startDate,
    endDate
  }: ICurseOrAcademyAttributes) => {
    setLoading(true)
    try {
      const { error, message, data: res } = await postAcademy({
        candidateId: user.personId,
        institute,
        title,
        untillNow: untillNow ? 1 : 0,
        resume,
        startDate,
        endDate
      })

      if (error) return toast.error(message, toastErrorProps)

      toast.success('Registro adicionada.', toastSuccessProps)
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
    <form style={{ width: '85%' }} onSubmit={handleSubmit(handleSave)}>
      <Toaster />
      <div className="shadow sm:rounded-md sm:overflow-hidden mb-5">
        <div className="">
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-6 sm:col-span-6">
              <TextField
                id="title"
                name="title"
                type="text"
                {...register('title')}
                required
                className="appearance-none mt-1  rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Título"
              />
            </div>
            <div className="col-span-6 sm:col-span-6">
              <TextField
                id="institute"
                name="institute"
                type="text"
                {...register('institute')}
                required
                className="appearance-none mt-1  rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Instituto"
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <TextField
                id="startDate"
                name="startDate"
                type="date"
                {...register('startDate')}
                required
                className="appearance-none mt-1  rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="C"
              />
            </div>
            <div className="col-span-6 sm:col-span-6">
              <div className="flex items-center">
                <input
                  id="untillNow"
                  name="untillNow"
                  {...register('untillNow')}
                  type="checkbox"
                  onClick={e => {
                    setShowEndDate(!getValues('untillNow'))
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="untillNow"
                  className="ml-2 block text-sm text-white"
                >
                  Até a data atual
                </label>
              </div>
            </div>
            {!showEndDate && (
              <div className="col-span-6 sm:col-span-6">
                <TextField
                  id="endDate"
                  name="endDate"
                  type="date"
                  {...register('endDate')}
                  required
                  className="appearance-none mt-1  rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus.ring-indigo-500 focus.border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="C"
                />
              </div>
            )}
          </div>
          <div>
            <div className="mt-3">
              <textarea
                id="about"
                name="resume"
                rows={3}
                className="shadow-sm focus.ring-indigo-500 focus.border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="sobre a experiência..."
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

export default AcademyForm
