import React from 'react'

import SignIn from '@client/views/sign-in'
import { getAPIClient } from '@services/axios'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

const SignInPage: React.FC = () => {
  return <SignIn />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: true
      }
    }
  }

  return {
    props: {}
  }
}

export default SignInPage
