import useIsMounted from '@client/hooks/use-is-mounted'
import { TextField } from '@components/fields'
import { FC, useEffect, useState } from 'react'
import { useDebounce } from 'use-lodash-debounce'
import { FilterFormProps } from './type'

const styles = {
  width: '50%'
}

const FilterForm: FC<FilterFormProps> = ({ data, triggerEvent }) => {
  const isMounted = useIsMounted()
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce(value, 800)

  useEffect(() => {
    if (!value) {
      if (isMounted.current) triggerEvent(data)
      return
    }

    const dataFiltered = data.filter(
      item =>
        item.designation.toLowerCase().includes(value) ||
        item.nif.toLowerCase().includes(value) ||
        item.phone.toLowerCase().includes(value) ||
        item.createdAt.toLowerCase().includes(value)
    )
    if (isMounted.current) triggerEvent(dataFiltered)
  }, [debouncedValue])

  return (
    <div className="rounded-md shadow-sm -space-y-px " style={styles}>
      <TextField
        id="search"
        name="search"
        type="text"
        required
        className="rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Pesquisar...  "
        onChange={e => setValue(e.target.value?.toLowerCase())}
      />
    </div>
  )
}

export default FilterForm
