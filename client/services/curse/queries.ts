export const CurseList = (id: string) => `query{CurseList(id:"${id}") {
  id
  untillNow
  institute
  title
  candidateId
  resume
  startDate
  endDate
}}`

export const StoreCurse = `mutation ($input: CurseInput) {
  CreateCurse(input: $input) {
    id
  }
}
`
