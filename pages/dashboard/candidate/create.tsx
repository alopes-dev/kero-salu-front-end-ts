import React from 'react'
import CreateCandidateView from '@client/views/dashboard/views/candidates/views/create'

import Layout from '@components/layout'
import DashboardContainer from '@client/views/dashboard/index'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '@services/axios'
import { parseCookies } from 'nookies'

const CandidatePage = () => {
  return (
    <Layout title="Candidate - Create">
      <DashboardContainer components={CreateCandidateView} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apiClient = getAPIClient(ctx)
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

export default CandidatePage
