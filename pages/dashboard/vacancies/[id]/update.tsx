import React from 'react'
import Layout from '@components/layout'
import DashboardContainer from '@client/views/dashboard/index'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import UpdateVacanciesView from '@client/views/dashboard/views/vacancies/views/update'
import { getOneVacance } from '@services/vacancies'
import { IVacanciesAttributes } from '@itypes/index'
import { FC } from 'react'

type VacanciesUpdatedPageProps = {
  vacancie: IVacanciesAttributes
}

const VacanciesUpdatedPage: FC<VacanciesUpdatedPageProps> = props => {
  return (
    <Layout title="Vacancies - Atualizar">
      <DashboardContainer {...props} components={UpdateVacanciesView} />
    </Layout>
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

export default VacanciesUpdatedPage
