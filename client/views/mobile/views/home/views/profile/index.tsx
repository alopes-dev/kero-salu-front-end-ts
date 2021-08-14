import { AuthContext } from '@contexts/auth'
import { useRouter } from 'next/router'
import React, { ReactNode, useContext } from 'react'
import { useState } from 'react'
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoPencilOutline
} from 'react-icons/io5'
import { v4 as uuid } from 'uuid'
import { ProfileConf } from './profile.conf'

import {
  Container,
  ActionsTopContainer,
  UserInfoDetails,
  UserInfoContainer,
  Items
} from './styles'

const Profile: React.FC = () => {
  const { back } = useRouter()
  const { user } = useContext(AuthContext)
  const [view, setView] = useState<ReactNode | null>(null)

  const content = () => {
    return Object.keys(ProfileConf).map(item => {
      return (
        <UserInfoDetails key={uuid()}>
          {Object.keys(ProfileConf[item]).map(sub => {
            const { icon, title, view: profView } = ProfileConf[item][sub]
            return (
              <Items key={uuid()}>
                <div className="item-iconed">
                  <div className={`shadow rounded-lg  ${sub}`}>{icon}</div>
                  <span>{title}</span>
                </div>
                <span
                  onClick={() => {
                    setView(profView)
                  }}
                >
                  <IoChevronForwardOutline />
                </span>
              </Items>
            )
          })}
        </UserInfoDetails>
      )
    })
  }

  return (
    <Container>
      <ActionsTopContainer>
        <span
          onClick={() => {
            if (view) return setView(null)
            back()
          }}
        >
          <IoChevronBackOutline />
        </span>
        {!view && (
          <span>
            <IoPencilOutline />
          </span>
        )}
      </ActionsTopContainer>
      {view && view}
      {!view && (
        <>
          <UserInfoContainer>
            <div className="image-container">
              <img src={'/img/pic.jpeg'} alt={`asas`} />
            </div>
            <h1>{user?.userName}</h1>
            <small>UI / UX Design</small>
          </UserInfoContainer>
          {content()}
        </>
      )}
    </Container>
  )
}

export default Profile
