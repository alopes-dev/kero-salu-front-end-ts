import JobDetailsViews from '@client/views/mobile/views/home/views/details'
import { IVacanciesAttributes } from '@itypes/index'
import { getOneVacance } from '@services/vacancies'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'

type JobDetailPageProps = {
  job: IVacanciesAttributes
}

const JobDetail: React.FC<JobDetailPageProps> = ({ job }) => {
  return <JobDetailsViews job={job} />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  const id = ctx.query.id as string
  const res = await getOneVacance(id)

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in-mobile',
        permanent: false
      }
    }
  }

  return {
    props: {
      job: res.data
    }
  }
}
export default JobDetail
