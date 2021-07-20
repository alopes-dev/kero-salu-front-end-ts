export type User = {
  id: string
  userName: string
  email: string
  avatarUrl: string
  provider: number
  companyId: string
}

export type SignInData = {
  userName: string
  provider: number
  password: string
}
