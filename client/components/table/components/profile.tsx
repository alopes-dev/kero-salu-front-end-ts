import React from 'react'
import { ProfileProps } from '../table.types'

const Profile: React.FC<ProfileProps> = ({ name, image, info, ...rest }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img
          className="h-10 w-10 rounded-full"
          src={
            image ||
            `https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60`
          }
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{info}</div>
      </div>
    </div>
  )
}

export default Profile
