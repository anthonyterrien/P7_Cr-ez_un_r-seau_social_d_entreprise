export interface IUser {
  id: number,
  lastName: string,
  firstName: string,
  pseudo: string,
  email: string,
  password: string,
  role: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: null | string
}

export interface ICredential {
  pseudo: string,
  password: string
}

export interface ISignup {
  lastName: string,
  firstName: string,
  pseudo: string,
  email: string,
  password: string
}

export interface ITokenUser{
  id: number,
  role: string,
  lastName: string,
  firstName: string,
  email: string,
  iap?: number,
  exp?: number
}

export interface IUserForUpdate {
  lastName: string,
  firstName: string,
  pseudo: string,
  email: string,
  password: string,
}

export interface ISingleUser{
  data: IUser
}

export interface IDataUser{
  data: IUser[]
}
