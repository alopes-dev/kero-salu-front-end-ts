export const SolicitationList = (
  id: string
) => `query{SolicitationList(id:"${id}") {
  id
  description
  documentTypeId
  candidateId
  candidatureId
  createdAt
  fileUrl
  candidature {
    id
    vacance{
      company{designation}
    }
  }
  documentType {
    id
    designation
  }
}}`

export const getOneSolicitation = (
  id: string
) => `query{Solicitation(id:"${id}") {
  id
  description
  documentTypeId
  candidateId
  candidatureId
  createdAt
  fileUrl
  candidature {
    id
    vacance{
      company{designation}
    }
  }
  documentType {
    id
    designation
  }
}}`

export const StoreSolicitation = `mutation ($input: SolicitationInput) {
  CreateSolicitation(input: $input) {
    id
  }
}
`

export const UpdateSolicitation = `mutation ($input: SolicitationInput) {
  UpdateSolicitation(input: $input) {
    id
  }
}
`

export const SolicitationListByCandidature = (id: string) => `
query{SolicitationListByCandidature(id:"${id}") {
  id
  candidateId
  candidatureId
	documentTypeId
  description
  createdAt
  fileUrl
  documentType {
    id
    designation
  }
}}
`
