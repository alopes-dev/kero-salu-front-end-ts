import React from 'react'
import { TextFieldProps } from './fields.types'

const TextField: React.FC<TextFieldProps> = ({
  labelName,
  name,
  type = 'text',
  placeholder,
  icon,
  id,
  ...othersProps
}) => {
  return (
    <div>
      <label htmlFor={labelName} className={labelName ? '' : 'sr-only'}>
        {labelName}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={name}
        {...othersProps}
        required
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextField
