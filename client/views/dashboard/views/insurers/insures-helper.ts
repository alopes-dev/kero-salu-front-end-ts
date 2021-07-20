import { ICompanyAttributes } from '@itypes/index'

export const dataModifier = (
  data: Array<ICompanyAttributes>
): Array<ICompanyAttributes | any> => {
  return data.map(entity => ({
    ...entity,
    name: entity.designation
  }))
}
