import React from 'react'
import CreateVacanciesView from '@client/views/dashboard/views/vacancies/views/create'

import Layout from '@components/layout'
import DashboardContainer from '@client/views/dashboard/index'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

const VacanciesPage = () => {
  return (
    <Layout title="Vacancies - Create">
      <DashboardContainer components={CreateVacanciesView} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default VacanciesPage
