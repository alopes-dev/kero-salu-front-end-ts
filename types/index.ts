export type Select = {
  value: string
  label: string
}

interface ITimestamp {
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface MinimalType {
  id: string
  designation: string
}

export interface ISkillAttributes extends ITimestamp {
  id?: string
  designation: string
  resume?: string
  candidateId?: string
}

export interface IHobbesAttributes extends ITimestamp {
  id?: string
  designation: string
  candidateId?: string
}

export interface CompanyMinimalType {
  id: string
  designation: string
  mission: string
  vision: string
  phone: string
  socialReason: string
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
  photoUrl: string
}

export interface ICandidatureAttributes extends ITimestamp {
  id?: string
  candidateId: string
  vacanciesId: string
  isAnalized?: Number
  candidate: IPersonAttributes
  status?: number
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
  company?: CompanyMinimalType
  office?: MinimalType
  province?: MinimalType
  nationality?: MinimalType
  status?: number
  candidatures?: Array<ICandidatureAttributes>
  vacanciesAreas?: Array<AreaType>
  vacanciesCompetences?: Array<CompetenceType>
  vacanciesBenefits?: Array<BenefitType>
  vacanciesLanguages?: Array<LanguageType>
  user?: ImproveUser
  job?: MinimalType
}

export interface ICompanyAttributes extends ITimestamp {
  designation: string
  nif: string
  socialReason: string
  mission: string
  vision: string
  phone: string
  id?: string
}

export interface ILanguageAttribute extends ITimestamp {
  id: string
  designation: string
}
export interface IPersonLanguageAttribute extends ITimestamp {
  id: string
  languageId: string
  languages: ILanguageAttribute
}

export interface IContactAttributes extends ITimestamp {
  phone: string
  email: string
}
export interface IPersonContactAttributes extends ITimestamp {
  id: string
  contact: IContactAttributes
}
export interface IPersonAttributes extends ITimestamp {
  firstName: string
  lastName: string
  birthDate: string
  id?: string
  experiences?: Array<IExperienceAttributes>
  curses?: Array<ICurseOrAcademyAttributes>
  academies?: Array<ICurseOrAcademyAttributes>
  languages?: Array<IPersonLanguageAttribute>
  candidateContact?: Array<IPersonContactAttributes>
  user?: ImproveUser
  skills?: Array<ISkillAttributes>
  hobbes?: Array<IHobbesAttributes>
}

export interface IExperienceAttributes extends ITimestamp {
  id?: string
  candidateId: string
  untillNow?: number
  company: string
  job: string
  resume: string
  startDate: string
  endDate?: string
  status?: number
}

export interface ICurseOrAcademyAttributes extends ITimestamp {
  id?: string
  candidateId: string
  untillNow?: number
  institute: string
  title: string
  resume: string
  startDate: string
  endDate?: string
  status?: number
}

export * from './http-response'
export * from './user'
