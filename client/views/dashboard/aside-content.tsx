import { useRouter } from 'next/dist/client/router'
import { useState, FC, useEffect } from 'react'
import { SideMenuItemView } from './aside-data'
import { Content, AppBar, Childrens } from './side-menu.style'
import { ChildrensProps, SideMenuItem } from './side-menu.types'
import TopBar from './aside-topbar'

const DashboardContent: FC<ChildrensProps> = ({ components, ...rest }) => {
  const { asPath } = useRouter()
  const pathsSplited = asPath.split('/')
  const [content, setContent] = useState<string>(null)

  useEffect(() => {
    if (pathsSplited.includes('[[...pages]]')) return
    setContent(asPath)
  }, [asPath])

  if (!content)
    return (
      <Content>
        <h1>Loading</h1>
      </Content>
    )

  const View = components || (SideMenuItemView[content] as SideMenuItem).view

  return (
    <Content>
      <TopBar />
      <Childrens>
        <View {...rest} />
      </Childrens>
    </Content>
  )
}

export default DashboardContent
