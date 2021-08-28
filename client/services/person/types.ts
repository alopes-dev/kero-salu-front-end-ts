export interface IUserAccount {
  password: string
  email: string
  provider: number
}

export interface IPersonData {
  id?: string
  firstName: string
  lastName: string
  birthDate: string
  userAccount?: IUserAccount
}
