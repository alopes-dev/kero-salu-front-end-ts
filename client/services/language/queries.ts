export const LanguageList = `query{LanguageList {
  id
  designation
}}`

export const PersonLanguageList = (
  id: string
) => `query{PersonLanguageList(id: "${id}") {
  id
  languageId
  languages{designation id}
}}`

export const StoreLanguage = `mutation ($input: PersonLanguageInput) {
  CreatePersonLanguage(input: $input) {
    id
  }
}`

export const DeletePersonLanguage = `
mutation ($id: String) {
  DeletePersonLanguage(id: $id) {
    id
  }
}
`
