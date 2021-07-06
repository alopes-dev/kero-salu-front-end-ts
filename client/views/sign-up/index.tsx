import { FC } from 'react'
import SignUpForm from './sign-up-form'
import { Container, ArtContainer, FormContainer, othersStyles } from './styles'
import SignInTop from '@client/views/sign-in/sign-in-top'
import { useMediaQuery } from 'beautiful-react-hooks'

const SignUp: FC = () => {
  const matches = useMediaQuery('(max-width: 48rem)')

  return (
    <Container>
      <ArtContainer
        className={'hidden'}
        style={{
          ...othersStyles.container,
          display: matches ? 'none' : 'flex'
        }}
      >
        <div className="lg:absolute justify-center lg:w-1/2">
          <img
            className="h-36 w-full object-cover sm:h-72 md:h-46 lg:w-full lg:h-full"
            src="/img/undraw_Location_search_re_ttoj.svg"
            alt=""
          />
        </div>
      </ArtContainer>
      <FormContainer style={{ width: matches ? '100%' : '48%' }}>
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <SignInTop text="Crie já a sua conta!" info="" />
            <SignUpForm />
          </div>
        </div>
      </FormContainer>
    </Container>
  )
}

export default SignUp
