import { ICandidatureAttributes, IVacanciesAttributes } from '@itypes/index'
import { ICandidatureStatus } from './vacancie'
import { months, series as seriesData } from './consts'

export const setStatus = (data: IVacanciesAttributes): ICandidatureStatus => {
  const { numVacancies, candidatures } = data

  return {
    approved:
      candidatures.filter(
        ({ isAnalized }: ICandidatureAttributes) => isAnalized === 1
      ) || [],
    rejected:
      candidatures.filter(
        ({ isAnalized }: ICandidatureAttributes) => isAnalized === -1
      ) || [],
    subscrib: candidatures,
    vacanceNumber: Number(numVacancies)
  }
}

const analitics = (
  candidates: Array<ICandidatureAttributes>,
  selector: string
) => {
  const series = []

  const amostras = []
  months.forEach(month => {
    let counter = 0
    candidates.forEach(candidate => {
      if (month === candidate[selector].split('-')[1] * 1) {
        counter++
      }
    })
    amostras.push(counter)
  })

  amostras.forEach(amostra => {
    series.push(amostra)
  })

  return series
}

export const setSeries = (candidatures: Array<ICandidatureAttributes>) => {
  const approvedOrRejected = [],
    subscribs = []

  months.forEach(month => {
    candidatures?.forEach((canditature: ICandidatureAttributes) => {
      const createdAt = Number(`${canditature.createdAt}`.split('-')[1])
      const updatedAt = Number(`${canditature.createdAt}`.split('-')[1])
      if (month === createdAt) subscribs.push(canditature)

      if (month === updatedAt) approvedOrRejected.push(canditature)
    })
  })

  const approveds = approvedOrRejected.filter(
    ({ isAnalized }) => isAnalized === 1
  )

  const rejected = approvedOrRejected.filter(
    ({ isAnalized }) => isAnalized === -1
  )

  seriesData[0].data = analitics(approveds, 'updatedAt')
  seriesData[1].data = analitics(subscribs, 'createdAt')
  seriesData[2].data = analitics(rejected, 'updatedAt')

  return seriesData
}
