import { IVacanciesAttributes } from '@itypes/index'

export const dataModifier = (
  data: Array<IVacanciesAttributes>
): Array<IVacanciesAttributes | any> => {
  return data.map(entity => ({
    ...entity,
    functionType: entity?.functionType?.designation
  }))
}
