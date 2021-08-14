import React from 'react'

import Layout from '@components/layout'
import DashboardContainer from '@client/views/dashboard/index'
import { GetServerSideProps } from 'next'

import { parseCookies } from 'nookies'
import GeneratorCV from '@components/generator-cv'
import { getPerson } from '@services/person'
import { IPersonAttributes } from '@itypes/index'
import { FC } from 'react'

type GeneratorCV = {
  candidate: IPersonAttributes
}

const CandidatePage: FC<GeneratorCV> = props => {
  return (
    <Layout title="Candidate - Curriculum">
      <DashboardContainer {...props} components={GeneratorCV} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  const id = ctx.query.id as string
  const res = await getPerson(id)

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
      candidate: res
    }
  }
}

export default CandidatePage
