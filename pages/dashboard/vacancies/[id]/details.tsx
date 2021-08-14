import DashboardContainer from '@client/views/dashboard'
import VacanciesDetails from '@client/views/dashboard/views/vacancies/views/details'
import Layout from '@components/layout'
import { VacanceProvider } from '@contexts/vacancie'
import { IVacanciesAttributes } from '@itypes/index'
import { getOneVacance } from '@services/vacancies'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React from 'react'

type VacanciesDetailedPageProps = {
  vacancie: IVacanciesAttributes
}

const DetailsViews: React.FC<VacanciesDetailedPageProps> = props => {
  return (
    <VacanceProvider>
      <Layout title="Vacancies - Detail">
        <DashboardContainer {...props} components={VacanciesDetails} />
      </Layout>
    </VacanceProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  const id = ctx.query.id as string
  const res = await getOneVacance(id)

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  return {
    props: {
      vacancie: res.data
    }
  }
}

export default DetailsViews
