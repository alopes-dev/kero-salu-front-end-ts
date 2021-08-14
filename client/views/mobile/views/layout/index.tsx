import { FC, Fragment, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Navigation, Profile } from './pages.conf'
import { AuthContext } from '@contexts/auth'
import { useRouter } from 'next/router'

type LayoutMobileProps = {
  title: string
}
const LayoutMobile: FC<LayoutMobileProps> = ({ children, title }) => {
  const { user, signOut } = useContext(AuthContext)
  const { push } = useRouter()
  return (
    <div>
      <Disclosure
        as="nav"
        style={{ position: 'fixed', zIndex: 99, width: '100%' }}
        className="bg-gray-800"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-14 w-14"
                      src="/img/k2.svg"
                      alt="Workflow"
                    />
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {Object.keys(Navigation).map((item, itemIdx) => {
                  if (Navigation[item].hide) return null
                  return itemIdx === 0 ? (
                    <Fragment key={Navigation[item].title}>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <div
                        onClick={() => {
                          push(Navigation[item].url)
                        }}
                        className="bg-gray-900 flex text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        <div className="mr-3">{Navigation[item]?.icon}</div>{' '}
                        {Navigation[item].title}
                      </div>
                    </Fragment>
                  ) : (
                    <div
                      key={Navigation[item].title}
                      onClick={() => {
                        push(Navigation[item].url)
                      }}
                      className="text-gray-300 flex hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      <div className="mr-3">{Navigation[item]?.icon}</div>{' '}
                      {Navigation[item].title}
                    </div>
                  )
                })}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user?.avatarUrl || '/img/pic.jpeg'}
                      alt="user-picture"
                    />
                  </div>
                  <div
                    className="ml-3"
                    onClick={() => {
                      push(Profile.Profile.url)
                    }}
                  >
                    <div className="text-base font-medium leading-none text-white">
                      {user?.userName}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user?.email}
                    </div>
                  </div>
                  <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {Object.keys(Profile).map(item => {
                    if (Profile[item].hide) return null
                    return (
                      <div
                        key={Profile[item].title}
                        className="block px-3 py-2 flex  rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        onClick={() => {
                          if (typeof Profile[item].func === 'function')
                            Profile[item].func(signOut)
                          else push(Profile[item].url)
                        }}
                      >
                        <div className="mr-3">{Profile[item]?.icon}</div>{' '}
                        {Profile[item].title}
                      </div>
                    )
                  })}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className=" rounded-lg h-96" style={{ marginTop: '50px' }}>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LayoutMobile
