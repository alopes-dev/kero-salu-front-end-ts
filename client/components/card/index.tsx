import { FC } from 'react'

type CardProps = {
  classNames?: string
}

const defaultValue =
  'max-w-7xl bg-white shadow rounded-lg  mx-auto py-6 sm:px-6 lg:px-8 '
const Card: FC<CardProps> = ({ children, classNames = defaultValue }) => {
  return (
    <div className={classNames}>
      <div className="sm:px-0">{children}</div>
    </div>
  )
}

export default Card
