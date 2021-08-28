import { FC } from 'react'

export type TextFieldProps = {
  icon?: FC
  labelName?: string
  defaultValue?: string | number
  register?: any
  name: string
  type: string
  placeholder: string
  id: string
  required: boolean
  className?: string
  value?: any
  onChange?: (e) => void
}

export type OptionTypeBase = {
  value: string
  label: string
}

export type FieldSelectableProps = {
  labelName?: string
  defaultValue?: Array<OptionTypeBase>
  isMulti?: boolean
  options: ReadonlyArray<OptionTypeBase>
  name: string
  value?: any
  onChange?: (e) => void
  control: any
  style?: any
}
