import React from 'react'

import SignMobileIn from '@client/views/mobile/views/sign-in'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'

const SignInMobilePage: React.FC = () => {
  return <SignMobileIn />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/mobile',
        permanent: true
      }
    }
  }

  return {
    props: {}
  }
}

export default SignInMobilePage
