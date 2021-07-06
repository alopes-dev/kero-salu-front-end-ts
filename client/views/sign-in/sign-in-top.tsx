import React from 'react'

// import { Container } from './styles';

type SignInProps = {
  text: string
  info: string
}

const SignInTop: React.FC<SignInProps> = ({ text, info }) => {
  return (
    <div>
      <img
        style={{ height: '5.4rem' }}
        className="mx-auto h-12 w-auto"
        src="/img/k2.svg"
        alt="Workflow"
      />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {text}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {info && (
          <>
            Or{' '}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {info}
            </a>
          </>
        )}
      </p>
    </div>
  )
}

export default SignInTop
