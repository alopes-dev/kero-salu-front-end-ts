import { ResponseInner, Select } from '@itypes/index'

export const transfSelect = (
  data: ReadonlyArray<ResponseInner>
): ReadonlyArray<Select> => {
  return data.map(item => ({
    value: item.id,
    label: item.designation
  }))
}
