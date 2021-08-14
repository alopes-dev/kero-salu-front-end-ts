export const HobbesList = (id: string) => `query{HobbesList(id:"${id}") {
  id
  designation
}}`

export const StoreHobbes = `mutation ($input: HobbesInput) {
  CreateHobbes(input: $input) {
    id
  }
}
`
