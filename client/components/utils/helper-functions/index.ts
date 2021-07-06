import { usersType } from '@components/types'
import api from 'src/services/api'

export const debounceEvent = (fn: Function, wait = 1000, time?) => (
  ...args: Array<any>
) => {
  clearTimeout(time)
  time = setTimeout(() => fn(...args), wait)
}

