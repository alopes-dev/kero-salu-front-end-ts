export const AcademyList = (id: string) => `query{AcademyList(id:"${id}") {
  id
  untillNow
  institute
  title
  candidateId
  resume
  startDate
  endDate
}}`

export const StoreAcademy = `mutation ($input: AcademyInput) {
  CreateAcademy(input: $input) {
    id
  }
}
`
