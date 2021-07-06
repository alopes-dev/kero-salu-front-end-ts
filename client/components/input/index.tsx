import React, {  forwardRef, InputHTMLAttributes } from 'react'

import { Label } from '@components/input/styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  color?: string
  icon?: React.ReactNode | React.Component
}

const Input = (props:InputProps, ref:any) => {
  const { name, type = 'text', color = '#7159c1', icon, ...rest } = props
  return (
    <Label htmlFor={name} color={color} icon={icon}>
      <input ref={ref} name={name} type={type} aria-label={name} {...rest} />
      <span> {icon && icon}</span>
    </Label>
  )
}

export default forwardRef(Input)
