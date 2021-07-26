import { IVacanciesAttributes } from '@itypes/index'
import React from 'react'
import {
  IoDocumentAttachOutline,
  IoEyeOutline,
  IoMegaphoneOutline
} from 'react-icons/io5'

import { Card } from './styles'

type CompanyInfoViewProps = {
  job: IVacanciesAttributes
}

const CompanyInfoView: React.FC<CompanyInfoViewProps> = ({ job }) => {
  return (
    <>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoMegaphoneOutline className="mr-3" /> <span>Contactos</span>
        </h4>
        <p>
          Denominação: <small>{job.company?.designation}</small>
        </p>
        <p>
          Telefone: <small>{job.company?.phone}</small>
        </p>
        <p>
          Email: <small>{job.user?.email}</small>
        </p>
      </Card>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoDocumentAttachOutline className="mr-3" /> <span>Missão</span>
        </h4>
        <p>
          <small>{job.company?.mission}</small>
        </p>
      </Card>
      <Card className="bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 ">
        <h4 className="font-bold mb-3 flex text-indigo-600">
          <IoEyeOutline className="mr-3" /> <span>Visão</span>
        </h4>
        <p>
          <small>{job.company?.vision}</small>
        </p>
      </Card>
    </>
  )
}

export default CompanyInfoView
