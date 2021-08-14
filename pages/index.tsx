import { Fragment } from 'react'
import Home from '@client/views/home'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

function HomePage() {
  return <Home />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  return {
    props: {}
  }
}

export default HomePage
