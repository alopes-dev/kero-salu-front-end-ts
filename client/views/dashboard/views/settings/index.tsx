import { FC, useRef, useState } from 'react'
import Card from '@components/card'
import {
  Content,
  MenuContainer,
  Menu,
  MenuItem,
  UserAvatar,
  UserName
} from './styles'

import { SettingConfig } from './components/setting.config'
import { IoPencilOutline } from 'react-icons/io5'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth'
import { UpdateUserAccount } from '@services/user-account'
import { ChangeEvent } from 'react'
import { api } from '@services/api'
import toast, { Toaster } from 'react-hot-toast'
import { toastSuccessProps, toastErrorProps } from '@constants/index'

const Settings: FC = () => {
  const [view, setView] = useState<any>(SettingConfig.account.view)
  const browseFileButton = useRef<HTMLInputElement>(null)
  const { user, setUser } = useContext(AuthContext)

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
    <Card classNames="bg-white shadow rounded-lg sm:px-6 lg:px-0">
      <Content>
        <Toaster />
        <MenuContainer>
          <input
            type="file"
            hidden
            ref={browseFileButton}
            name="file"
            accept=".jpeg', .jpg, .png"
            onChange={handlechange}
          />
          <UserAvatar>
            <div className="image-container">
              <img
                src={
                  `http://localhost:5500/files/${user?.avatarUrl}` ||
                  '/img/pic.jpeg'
                }
                alt="user-picture"
              />
              <IoPencilOutline
                onClick={() => browseFileButton.current!.click()}
              />
            </div>
          </UserAvatar>
          <UserName>{user?.userName}</UserName>
          <Menu>
            {Object.keys(SettingConfig).map(item => (
              <MenuItem
                onClick={() => setView(SettingConfig[item].view)}
                key={SettingConfig[item].title}
                active={view === SettingConfig[item].view}
                style={{
                  backgroundColor:
                    view === SettingConfig[item].view
                      ? 'rgb(57 60 72)'
                      : 'white'
                }}
              >
                {SettingConfig[item].icon}
                {SettingConfig[item].title}
              </MenuItem>
            ))}
          </Menu>
        </MenuContainer>
        {view}
      </Content>
    </Card>
  )
}

export default Settings
