export const CompanyList = `query{CompanyList {
  id
  designation
}}`

export const StoreCompany = `mutation($input: CompanyInput){
  CreateCompany(input: $input){
    id

  }
}`
