import React from 'react'

const Custumized: React.FC = ({ children }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {children}
    </td>
  )
}

export default Custumized
