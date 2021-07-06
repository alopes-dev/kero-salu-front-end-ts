import axios from 'axios'
import { parseCookies } from 'nookies'

export function getAPIClient(ctx?: any) {
  const { 'nextauth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:5500'
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
