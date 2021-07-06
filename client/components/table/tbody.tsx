import { FC } from 'react'
import { TBodyProps } from './table.types'
import Custumized from './custumized'
import { Menu, Transition } from '@headlessui/react'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'

const Tbody: FC<TBodyProps> = ({
  columns,
  data,
  onDelete,
  onShow,
  onUpdate
}) => {
  const contents = data.map(item => {
    return (
      <tr>
        {columns.map(column => {
          if (column.isCustumized) {
            const View = column.view
            return (
              <Custumized key={column.key}>
                <View {...column} {...item} key={column.key} />
              </Custumized>
            )
          }
          return (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item[column.key]}
            </td>
          )
        })}
        <td
          className="px-6 py-4 text-align-end whitespace-nowrap text-sm text-gray-500"
          style={{ textAlign: 'end' }}
        >
          <span
            title="Detalhe"
            onClick={() => {
              onShow(item)
            }}
            className="px-2  inline-flex text-xs leading-5 font-semibold rounded-corner    text-green-800"
          >
            <EyeIcon
              className="-ml-1 mr-2 h-5 w-5 text-white"
              aria-hidden="true"
              style={{ color: '#9b9de5', cursor: 'pointer' }}
            />
          </span>
          <span
            onClick={() => {
              onUpdate(item)
            }}
            className="px-2 mr-2 ml-2 inline-flex text-xs leading-5 font-semibold rounded-full text-indigo-800"
          >
            <PencilIcon
              className="-ml-1 mr-2 h-5 w-5 text-white"
              aria-hidden="true"
              style={{ color: '#5994d8', cursor: 'pointer' }}
            />
          </span>
          <span
            onClick={() => {
              onDelete(item)
            }}
            className="px-2  inline-flex text-xs leading-5 font-semibold rounded-full  text-red-800"
          >
            <TrashIcon
              className="-ml-1 mr-2 h-5 w-5 text-white"
              aria-hidden="true"
              style={{ color: '#d85959', cursor: 'pointer' }}
            />
          </span>
        </td>
      </tr>
    )
  })

  return <tbody className="bg-white divide-y divide-gray-200">{contents}</tbody>
}

export default Tbody

{
  /*
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            Regional Paradigm Technician
          </div>
          <div className="text-sm text-gray-500">Optimization</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          Admin
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit
          </a>
        </td> */
}
