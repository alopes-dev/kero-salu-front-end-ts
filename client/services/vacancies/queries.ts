export const VacanciesList = `query{VacanciesList {
  id
  limitHours
  salary
  limitDate
  isDone
  city
  employerId
  formationTypeId
  nationalityId
  experience
  numVacancies
  functionType{
    id
    designation
  }
  company {
    id
    designation
  }
  details
  createdAt
  updatedAt
}}`

export const VacanciesListByComapyId = (id: string) => `
query{VacanciesListByComapyId(id: "${id}") {
  id
  limitHours
  salary
  limitDate
  isDone
  city
  employerId
  formationTypeId
  nationalityId
  experience
  numVacancies
  functionType{
    id
    designation
  }
  details
  createdAt
  updatedAt

}}`

export const vacanceOne = (id: string) => `
query{Vacancies(id:"${id}") {
  id
  limitHours
  salary
  limitDate
  isDone
  city
  skills
  employerId
  formationTypeId
  nationalityId
  functionTypeId
  functionType{id  designation }
  formationType{id designation}
  company{id
    designation
    mission
    vision
    phone
    socialReason
  }
  office{id designation}
  province{id designation}
  nationality{id designation}
  vacanciesAreas{area{id designation}}
  vacanciesBenefits{benefit{id designation}}
  vacanciesLanguages{language{id designation}}
  vacanciesCompetences{competence{id designation}}
  user{email userName}
  job{id designation}
  experience
  numVacancies
  details
  createdAt
  updatedAt

}}`

export const StoreVacancies = `mutation($input: VacanciesInput){
  CreateVacancies(input: $input){
    id

  }
}`

export const CancelVacance = (id: string) => `
query{
  CancelVacancies(id:"${id}"){
    id
  }
}
`

export const UpdateVacance = `mutation($input: VacanciesInput){
  UpdateVacancies(input: $input){
    id

  }
}`
