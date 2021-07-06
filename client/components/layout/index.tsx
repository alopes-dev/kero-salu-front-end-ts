import { FC } from 'react'
import Head from 'next/head'

import { Container } from '@styles/pages/Main'
import { LayoutProps } from './layout.types'

const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Container>{children}</Container>
    </>
  )
}

export default Layout
