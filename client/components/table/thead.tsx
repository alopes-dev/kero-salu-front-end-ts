import { FC } from 'react'
import { TheadProps } from './table.types'

const Thead: FC<TheadProps> = ({ columns }) => {
  const heads = columns.map(column => (
    <th
      scope="col"
      key={column.key}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {column.label}
    </th>
  ))

  return (
    <thead className="bg-gray-50">
      <tr>
        {heads}
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          style={{ textAlign: 'end' }}
        >
          Acções
        </th>
      </tr>
    </thead>
  )
}

export default Thead
