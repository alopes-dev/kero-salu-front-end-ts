export interface IUserAccount {
  password: string
  email: string
  provider: number
}

export interface IPersonData {
  firstName: string
  lastName: string
  birthDate: string
  userAccount: IUserAccount
}
