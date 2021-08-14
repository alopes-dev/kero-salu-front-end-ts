import { FC } from 'react'
import AsideMenuItem from './aside-menu-item'
import Image from 'next/image'

import { Aside, Container, UserName, UserAvatar, Hr } from './side-menu.style'
import { useContext } from 'react'
import { AuthContext } from '@contexts/auth'

const AsideMenu: FC = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container>
      <Aside className="shadow">
        <img
          style={{ height: '5.4rem' }}
          className="mx-auto h-12 w-auto"
          src="/img/k2.svg"
          alt="Workflow"
        />
        <Hr />
        <AsideMenuItem />
        <Hr className="mt-5" />
        <div className="flex">
          <UserAvatar>
            <Image
              width={70}
              height={70}
              src={user?.avatarUrl || '/img/pic.jpeg'}
              alt="user-picture"
            />
          </UserAvatar>
          <UserName>{user?.userName}</UserName>
        </div>
      </Aside>
    </Container>
  )
}

export default AsideMenu
