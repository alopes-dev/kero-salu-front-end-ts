import { IVacanciesAttributes } from '@itypes/index'
import React from 'react'
import {
  IoDocumentAttachOutline,
  IoFlask,
  IoGlobeOutline,
  IoLayersOutline,
  IoSkullOutline,
  IoTrainOutline
} from 'react-icons/io5'
import { v4 as uuid } from 'uuid'

import { Card } from './styles'

type DescriptionViewProps = {
  job: IVacanciesAttributes
}

const DescriptionView: React.FC<DescriptionViewProps> = ({ job }) => {
  return (
    <>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 text-indigo-600">Qualificação</h4>
        <p>
          Experiência: <small>{job.experience}</small>
        </p>
        <p>
          Contrato: <small>{job.job?.designation}</small>
        </p>

        <p>
          Formação: <small>{job.formationType?.designation}</small>
        </p>
        <p>
          Sector: <small>{job.office?.designation}</small>
        </p>
        <p>
          Nº de vaga: <small>{job.numVacancies}</small>
        </p>
        <p>
          Cidade:
          <small>
            {job.province?.designation}, {job.nationality?.designation}
          </small>
        </p>
        <p>
          Salário:
          <small className=" ml-2 font-bold">
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'AOA'
            }).format(job?.salary)}
          </small>
        </p>
        <p>
          Data limite: <small>{job.limitDate}</small>
        </p>
      </Card>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoLayersOutline className="mr-3" /> <span>Competências</span>
        </h4>
        <ul>
          {job.vacanciesCompetences?.map(item => (
            <li key={uuid()}>{item.competence.designation}</li>
          ))}
        </ul>
      </Card>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoFlask className="mr-3" /> <span>Habilidades</span>
        </h4>
        <ul>
          {job.skills?.split(',').map(item => (
            <li key={uuid()}>{item}</li>
          ))}
        </ul>
      </Card>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoSkullOutline className="mr-3" /> <span>Âreas</span>
        </h4>
        <ul>
          {job.vacanciesAreas?.map(item => (
            <li key={uuid()}>{item.area.designation}</li>
          ))}
        </ul>
      </Card>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoTrainOutline className="mr-3" /> <span>Benêficios</span>
        </h4>
        <ul>
          {job.vacanciesBenefits?.map(item => (
            <li key={uuid()}>{item.benefit.designation}</li>
          ))}
        </ul>
      </Card>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoGlobeOutline className="mr-3" /> <span>Idiomas</span>
        </h4>
        <ul>
          {job.vacanciesLanguages?.map(item => (
            <li key={uuid()}>{item.language.designation}</li>
          ))}
        </ul>
      </Card>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoDocumentAttachOutline className="mr-3" />{' '}
          <span>Acerca do Vaga</span>
        </h4>
        <p>{job.details}</p>
      </Card>
    </>
  )
}

export default DescriptionView
