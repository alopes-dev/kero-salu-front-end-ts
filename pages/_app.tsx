import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import '@styles/index.css'
import GlobalStyle from '@styles/global'
import theme from '@styles/theme'
import { AuthProvider } from '@client/contexts/auth'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
        <GlobalStyle />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
