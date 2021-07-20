import { OptionTypeBase } from '@components/fields/fields.types'
import { FC } from 'react'

export type EditFlexibleProps = {
  fieldType: string
  icon?: FC
  labelName?: string
  defaultValue?: string | number | Array<OptionTypeBase>
  register?: any
  name: string
  type: string
  placeholder?: string
  id: string
  required: boolean
  className?: string
  isMulti?: boolean
  options?: ReadonlyArray<OptionTypeBase>
  value?: any
  onChange?: (e) => void
  control?: any
  style?: any
  entityId?: string
  onSubmit?(data: any): any
}
