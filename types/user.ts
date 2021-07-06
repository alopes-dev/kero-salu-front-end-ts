export type User = {
  id: string
  userName: string
  email: string
  avatarUrl: string
}

export type SignInData = {
  userName: string
  provider: number
  password: string
}
