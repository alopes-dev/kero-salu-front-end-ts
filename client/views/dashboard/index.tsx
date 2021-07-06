import { FC } from 'react'
import AsideMenu from './aside-menu'
import { App } from './side-menu.style'
import DashboardContent from './aside-content'
import { ChildrensProps } from './side-menu.types'

const DashboardContainer: FC<ChildrensProps> = ({ components, ...rest }) => {
  return (
    <App>
      <AsideMenu />
      <DashboardContent {...rest} components={components} />
    </App>
  )
}

export default DashboardContainer
