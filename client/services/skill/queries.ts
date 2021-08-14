export const SkillList = (id: string) => `query{SkillList(id:"${id}") {
  id
  designation
  resume
}}`

export const StoreSkill = `mutation ($input: SkillInput) {
  CreateSkill(input: $input) {
    id
  }
}
`
