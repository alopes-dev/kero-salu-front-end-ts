import React from 'react'

import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import EditProfileView from '@client/views/mobile/views/edit-profile'
import GlobalStyle from '@styles/globalMobile'
const EditProfilePage: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <EditProfileView />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  const id = ctx.query.id as string
  // const res = await getOneVacance(id)

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
      job: {}
    }
  }
}

export default EditProfilePage
