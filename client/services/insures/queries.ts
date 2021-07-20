export const CompanyList = `query{CompanyList {
  id
  designation
  nif
  socialReason
  mission
  vision
  phone
  createdAt
}}`

export const CompanyOne = (id: string) => `
query{Company(id:"${id}") {
  id
  designation
  nif
  socialReason
  mission
  vision
  phone
  createdAt
}}`

export const StoreCompany = `mutation($input: CompanyInput){
  CreateCompany(input: $input){
    id

  }
}`

export const CancelCompany = (id: string) => `
query{
  CancelCompany(id:"${id}"){
    id
  }
}
`

export const UpdateCompany = `mutation($input: CompanyInput){
  UpdateCompany(input: $input){
    id

  }
}`
