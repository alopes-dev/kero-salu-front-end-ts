import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { FC } from 'react'
import { SideMenuItemView } from './aside-data'

import { SideItems, Item } from './side-menu.style'

const AsideMenuItem: FC = () => {
  const [active, setActive] = useState<string>('Dashboard')
  const { push } = useRouter()

  const handleActive = (item: string, url: string) => {
    push(url).then()
    setActive(item)
  }

  return (
    <SideItems>
      {Object.keys(SideMenuItemView).map(item => {
        const { title, icon: Icon, url } = SideMenuItemView[item]
        return (
          <Item
            key={title}
            active={active === title}
            className="bg-indigo-600"
            onClick={() => handleActive(title, url)}
          >
            <Icon />
            {title}
          </Item>
        )
      })}
    </SideItems>
  )
}

export default AsideMenuItem
