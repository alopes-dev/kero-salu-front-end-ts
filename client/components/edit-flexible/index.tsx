import { SelectFieldSelectable } from '@components/fields'
import { PencilIcon, CheckIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import { useState } from 'react'
import {
  IoBagRemoveSharp,
  IoRemoveOutline,
  IoRemoveSharp
} from 'react-icons/io5/'
import { EditFlexibleProps } from './types'

// import { Container } from './styles';

const EditFlexible: React.FC<EditFlexibleProps> = ({
  fieldType,
  name,
  control,
  ...rest
}) => {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div
      className="flex justify-between alignItems-center"
      style={{ width: '70%' }}
    >
      <div style={{ width: '80%' }}>
        {isEditing && (
          <SelectFieldSelectable
            options={[]}
            name={name}
            // defaultValue={defaultSelect([vacancie?.job])}
            control={control}
          />
        )}
      </div>

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
            style={{ color: '#d83939', borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => setIsEditing(false)}
          />
          <CheckIcon
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
