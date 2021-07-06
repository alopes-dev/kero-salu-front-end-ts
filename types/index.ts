export type Select = {
  value: string
  label: string
}

interface ITimestamp {
  createdAt?: Date
  updatedAt?: Date
}

export interface MinimalType {
  id: string
  designation: string
}

export type AreaType = {
  area: MinimalType
}

export type CompetenceType = {
  competence: MinimalType
}

export type BenefitType = {
  benefit: MinimalType
}

export type LanguageType = {
  language: MinimalType
}

export type SkillType = {
  skill: MinimalType
}

export type ImproveUser = {
  email: string
  userName: string
}

export interface IVacanciesAttributes extends ITimestamp {
  id?: string
  limitHours: string
  salary: number
  limitDate: string
  isDone: string
  showSalary: string
  city: string
  jobsTypeId?: string
  functionTypeId?: string
  formationTypeId?: string
  provinceId: string
  nationalityId: string
  experience?: string
  numVacancies: string
  details: string
  skills: string
  officeId: string
  companyId: string
  functionType?: MinimalType
  formationType?: MinimalType
  company?: MinimalType
  office?: MinimalType
  province?: MinimalType
  nationality?: MinimalType
  status?: number
  vacanciesAreas?: Array<AreaType>
  vacanciesCompetences?: Array<CompetenceType>
  vacanciesBenefits?: Array<BenefitType>
  vacanciesLanguages?: Array<LanguageType>
  user?: ImproveUser
  job?: MinimalType
}

export * from './http-response'
export * from './user'
