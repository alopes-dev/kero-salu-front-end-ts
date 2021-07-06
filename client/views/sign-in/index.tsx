import { FC } from 'react'
import SignInTop from './sign-in-top'
import SignInForm from './sign-in-form'

const SignIn: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignInTop text="Sign in to your account" info="Antonio" />
        <SignInForm />
      </div>
    </div>
  )
}

export default SignIn
