import useIsMounted from '@client/hooks/use-is-mounted'
import { SelectFieldSelectable, TextField } from '@components/fields'
import { PencilIcon, CheckIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import { useState } from 'react'
import { EditFlexibleProps } from './types'

import toast, { Toaster } from 'react-hot-toast'
import { useAsyncState } from 'just-hook'

const EditFlexible: React.FC<EditFlexibleProps> = ({
  fieldType,
  name,
  control,
  options,
  entityId,
  onSubmit,
  id,
  placeholder,
  required,
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState()
  const { loading, setLoading } = useAsyncState()
  const isMounted = useIsMounted()

  const handleSave = async () => {
    if (!value) return
    setLoading(true)

    const { error, message } = await onSubmit({ [name]: value, id: entityId })
    if (isMounted.current) setLoading(false)
    if (error)
      return toast.error(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#d85959',
          color: '#fff'
        }
      })
    toast.success(message, {
      duration: 4000,
      position: 'top-right'
    })
  }

  const content = () => {
    if (fieldType === 'select') {
      return (
        <SelectFieldSelectable
          options={options}
          name={name}
          onChange={e => {
            setValue(e.value)
          }}
          control={control}
        />
      )
    }

    return (
      <TextField
        type={fieldType}
        name={name}
        onChange={e => {
          setValue(e.target.value)
        }}
        className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        required
        id={id}
        placeholder={placeholder}
      />
    )
  }

  return (
    <div
      className="flex justify-between alignItems-center"
      style={{ width: '70%' }}
    >
      <Toaster />
      <div style={{ width: '80%' }}>{isEditing && content()}</div>

      {!isEditing && (
        <PencilIcon
          className="-ml-1 ml-4 mr-2 h-5 w-5 text-white mt-3"
          aria-hidden="true"
          style={{ cursor: 'pointer' }}
          onClick={() => setIsEditing(true)}
        />
      )}
      {isEditing && (
        <>
          <TrashIcon
            className="-ml-1 ml-4 hover:bg-gray-500 hover:text-white-700 mr-2 h-5 w-5 text-white mt-3"
            aria-hidden="true"
            style={{
              color: '#d83939',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
            onClick={() => setIsEditing(false)}
          />
          <CheckIcon
            onClick={handleSave}
            className="-ml-1 mr-2 h-5 w-5 text-white mt-3"
            aria-hidden="true"
            style={{ color: '#6cac22', cursor: 'pointer' }}
          />
        </>
      )}
    </div>
  )
}

export default EditFlexible
