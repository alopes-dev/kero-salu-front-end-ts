export const CandidatureList = `query{CandidatureList {
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
  numCandidature
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

export const CandidatureOne = (id: string) => `
query{Candidature(id:"${id}") {
  id
  isAnalized
  candidateId
  createdAt
  updatedAt
}}`

export const StoreCandidature = `mutation($input: CandidatureInput){
  CreateCandidature(input: $input){
    id

  }
}`

export const VerifyCandidature = `
mutation ($input: CandidatureInput) {
  VerifyCandidature(input: $input) {
    already
  }
}`

export const CancelCandidature = (id: string) => `
query{
  CancelCandidature(id:"${id}"){
    id
  }
}
`

export const UpdateCandidature = `mutation($input: CandidatureInput){
  UpdateCandidature(input: $input){
    id
  }
}`
