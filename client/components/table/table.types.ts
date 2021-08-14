import { FC } from 'react'

export type TableProps = {
  data: Array<Object>
  columns: Array<ColumnsItems>
  onShow?(data: any): void
  onUpdate?(data: Object): void
  onDelete?(data: Object): void
}

export type ColumnsItems = {
  label: string
  numeric?: boolean
  key: string
  isCustumized?: boolean
  info?: string
  view?: FC<any>
  image?: string
}

export type TheadProps = {
  columns: Array<ColumnsItems>
}

export type TBodyProps = {
  data: Array<Object>
  columns: Array<ColumnsItems>
  onShow?(data: Object): void
  onUpdate?(data: Object): void
  onDelete?(data: Object): void
}

export type ProfileProps = {
  name: string
  image: string
  info: string
}
