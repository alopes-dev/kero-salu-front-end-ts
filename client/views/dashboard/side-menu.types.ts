import { FC, ReactNode } from 'react'

export type SideMenuItem = {
  title: string
  icon: FC
  url: string
  view: FC
}

export type ChildrensProps = {
  components?: FC
}
