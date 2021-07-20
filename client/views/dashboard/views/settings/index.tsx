import { FC, useState } from 'react'
import Card from '@components/card'
import {
  Content,
  MenuContainer,
  Menu,
  MenuItem,
  UserAvatar,
  UserName
} from './styles'
import Image from 'next/image'

import { SettingConfig } from './components/setting.config'

const Settings: FC = () => {
  const [view, setView] = useState<any>(SettingConfig.account.view)

  return (
    <Card classNames="bg-white shadow rounded-lg sm:px-6 lg:px-0">
      <Content>
        <MenuContainer>
          <UserAvatar>
            <Image
              width={90}
              height={90}
              src={'/img/pic.jpeg'}
              alt="user-picture"
            />
          </UserAvatar>
          <UserName>Global Seguros</UserName>
          <Menu>
            {Object.keys(SettingConfig).map(item => (
              <MenuItem
                onClick={() => setView(SettingConfig[item].view)}
                key={SettingConfig[item].title}
                style={{
                  backgroundColor:
                    view === SettingConfig[item].view ? '#abb0e6' : 'white'
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
