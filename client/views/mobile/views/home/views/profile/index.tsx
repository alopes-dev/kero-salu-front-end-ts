import { AuthContext } from '@contexts/auth'
import { useRouter } from 'next/router'
import React, { ChangeEvent, ReactNode, useContext, useRef } from 'react'
import { useState } from 'react'
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoPencilOutline
} from 'react-icons/io5'
import { v4 as uuid } from 'uuid'
import { ProfileConf } from './profile.conf'
import { api } from '@services/api'

import {
  Container,
  ActionsTopContainer,
  UserInfoDetails,
  UserInfoContainer,
  Items
} from './styles'
import { UpdateUserAccount } from '@services/user-account'
import toast, { Toaster } from 'react-hot-toast'
import { toastErrorProps, toastSuccessProps } from '@constants/index'

const Profile: React.FC = () => {
  const { back, push } = useRouter()
  const { user, setUser } = useContext(AuthContext)
  const [view, setView] = useState<ReactNode | null>(null)
  const browseFileButton = useRef<HTMLInputElement>(null)
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

  const handlechange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files[0]
      const formData = new FormData()

      formData.append('file', file)
      const { data } = await api.post('/upload', formData)

      const res = await UpdateUserAccount({
        photoUrl: data.avatar_url,
        id: user.id
      })

      setUser({
        ...user,
        avatarUrl: data.avatar_url
      })
      toast.success('Foto do perfil atualizado', toastSuccessProps)
    } catch (error) {
      toast.error(error.message, toastErrorProps)
    }
  }

  return (
    <Container>
      <Toaster />
      <ActionsTopContainer>
        <input
          type="file"
          hidden
          ref={browseFileButton}
          name="file"
          accept=".jpeg', .jpg, .png"
          onChange={handlechange}
        />
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
            <IoPencilOutline
              onClick={() => {
                push('/mobile/edit-profile')
              }}
            />
          </span>
        )}
      </ActionsTopContainer>
      {view && view}
      {!view && (
        <>
          <UserInfoContainer>
            <div className="image-container">
              <img
                src={
                  `http://localhost:5500/files/${user?.avatarUrl}` ||
                  '/img/pic.jpeg'
                }
                alt={`asas`}
              />
              <IoPencilOutline
                onClick={() => browseFileButton.current!.click()}
              />
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
