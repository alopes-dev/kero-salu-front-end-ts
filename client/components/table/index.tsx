import React from 'react'
import Thead from './thead'
import Tbody from './tbody'
import { TableProps } from './table.types'

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onUpdate,
  onShow,
  onDelete
}) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <Thead columns={columns} />
              <Tbody
                columns={columns}
                data={data || []}
                onUpdate={onUpdate}
                onShow={onShow}
                onDelete={onDelete}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
