import React, { FC } from 'react'
import { Controller } from 'react-hook-form'

import Select from 'react-select'
import { FieldSelectableProps } from './fields.types'
import { Select as SelectedType } from '@itypes/index'

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    marginTop: '6px'
  })
}

const FieldSelectable: FC<FieldSelectableProps> = ({
  options,
  labelName,
  name,
  control,
  isMulti,
  style,
  ...otherProps
}) => {
  function handleChange(
    values: Array<SelectedType>,
    valueSelected: SelectedType
  ) {
    if (isMulti) return values?.map(c => c.value)
    return valueSelected.value
  }

  console.log(style)
  return (
    <div style={style}>
      <label htmlFor={labelName} className={labelName ? '' : 'sr-only'}>
        {labelName}
      </label>
      <Controller
        control={control}
        defaultValue={options?.map(c => c.value)}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            inputRef={ref}
            value={options?.find(c => c.value === value)}
            onChange={val => onChange(handleChange(val, val))}
            styles={customStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#0d1146'
              }
            })}
            isMulti={isMulti}
            options={options}
            {...otherProps}
          />
        )}
      />
    </div>
  )
}

export default FieldSelectable
