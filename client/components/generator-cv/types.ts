import { IPersonAttributes } from '@itypes/index'

export type Type = 'curse' | 'experience' | 'education'
export type DataType = {
  title: string
  institute: string
  resume: string
  startDate: string
  endDate: string
}
export type ExperienceProps = {
  type: Type
  data: Array<DataType>
}

export type GeneratorCVProps = {
  candidate: IPersonAttributes
}
