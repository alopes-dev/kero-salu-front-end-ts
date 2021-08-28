import { ResponseInner, Select } from '@itypes/index'

export const transfSelect = (
  data: ReadonlyArray<ResponseInner>
): ReadonlyArray<Select> => {
  return data.map(item => ({
    value: item.id,
    label: item.designation
  }))
}

export const imgFileExtension = ['jpeg', 'jpg', 'png'] as ReadonlyArray<string>

export const docsFileExtension = [
  'pdf',
  'doc',
  'docx',
  'msword',
  'vnd.openxmlformats-officedocument.wordprocessingml.document',
  'odt',
  'xls',
  'xlsx',
  'ods',
  'ppt',
  'pptx',
  'txt',
  ...imgFileExtension
] as ReadonlyArray<string>
