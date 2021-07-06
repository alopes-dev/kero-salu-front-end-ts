import React from 'react'
import { Popover } from '@headlessui/react'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'

const Home: React.FC = () => {
  const { push } = useRouter()

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div className="px-5 pt-4 flex items-center justify-center">
                  <div>
                    <img className="h-20 w-auto" src="/img/k2.svg" alt="" />
                  </div>
                </div>
              </nav>
            </div>
          </Popover>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="text-6xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-6xl">
                <span className="block xl:inline">
                  Encontre a sua vaga
                  <br />
                </span>
                <span className="block text-indigo-600 xl:inline">
                  <small>na </small>Kero Salu
                </span>
              </h2>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaec
                fugiat aliqua.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <div
                    onClick={() => push(ROUTES.SIGN_IN).then()}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600  md:py-4 md:text-lg md:px-10"
                  >
                    Acessar
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <div
                    onClick={() => push(ROUTES.SIGN_UP).then()}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Criar conta
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          style={{ marginLeft: '36px' }}
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/img/job.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Home
