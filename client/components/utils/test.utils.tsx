import React from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '@styles/global'
import theme from '@styles/theme'

export const Wrapper: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div id="__next">{children}</div>
    </ThemeProvider>
  )
}
