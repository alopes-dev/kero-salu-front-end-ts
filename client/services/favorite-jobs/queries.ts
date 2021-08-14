export const BenefitList = `query{benefitList {
  id
  designation
}}`


export const isFavoriteJobs = ({vacanciesId, candidateId }) => `
query{FavoriteJobsOne(vacanciesId: "${vacanciesId}",candidateId: "${candidateId}" ) {
  id
  candidateId
  vacanciesId
}}
`
