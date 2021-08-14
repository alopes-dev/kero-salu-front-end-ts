import React from 'react'
import LayoutMobile from '@client/views/mobile/views/layout'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import Profile from '@client/views/mobile/views/home/views/profile'
import GlobalStyle from '@styles/globalMobile'

const ProfileMobile: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Profile />
    </>
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
