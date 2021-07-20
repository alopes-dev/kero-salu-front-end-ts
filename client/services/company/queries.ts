export const CompanyList = `query{CompanyList {
  id
  designation
}}`

export const StoreCompany = `mutation($input: CompanyInput){
  CreateCompany(input: $input){
    id

  }
}`

export const patchCompany = `mutation($input: CompanyInput){
  UpdateCompany(input: $input){
    id

  }
}`

export const CompanyById = (id: string) => `
query{Company(id: "${id}") {
  id
	designation
  nif
  socialReason
  mission
  vision
  phone
}}
`
