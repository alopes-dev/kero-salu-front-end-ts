export const ExperienceList = (
  id: string
) => `query{ExperienceList(id:"${id}") {
  id
  untillNow
  company
  job
  candidateId
  resume
  startDate
  endDate
}}`

export const StoreExperience = `mutation ($input: ExperienceInput) {
  CreateExperience(input: $input) {
    id
  }
}
`
