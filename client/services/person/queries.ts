export const PersonList = `query{PersonList {
  id
  firstName
}}`

export const candidate = `query{PersonList {
  id
  firstName
  lastName
}}`

export const StorePerson = `mutation($input: PersonInput){
  CreatePerson(input: $input){
    id

  }
}`

export const patchPerson = `mutation($input: PersonInput){
  UpdatePerson(input: $input){
    id

  }
}`

export const PersonById = (id: string) => `
query{Person(id: "${id}") {
  id
	firstName
  lastName
  birthDate
  languages {
    id
    languages {
      id
      designation
    }
  }
  skills {
    id
    designation
  }
  hobbes {
	  id
    designation
	}
  user {
    id
   photoUrl
  }
  curses{
    id
    untillNow
    institute
    title
    candidateId
    resume
    startDate
    endDate
  }
  academies{
    id
    untillNow
    institute
    title
    candidateId
    resume
    startDate
    endDate
  }
  experiences {
    id
    untillNow
    company
    job
    candidateId
    resume
    startDate
    endDate
  }
  candidateContact{
    contact{
      phone
      email

    }
  }
}}
`

export const getAllPersonFromVacance = (id: string) => `
query{CandidatureByVacanciesId(id:"${id}"){
  id
 companyId
  candidatures {
    id
    candidateId
    candidate {
      id
      lastName
      firstName
      birthDate
      address
      user {
        id
        email
        photoUrl
      }
    }
  }
}}
`
