import React from 'react'
import LayoutMobile from '@client/views/mobile/views/layout'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

const ProfileMobile: React.FC = () => {
  return (
    <LayoutMobile title="Profile">
      <h1>Profile Page</h1>
    </LayoutMobile>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in-mobile',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default ProfileMobile
