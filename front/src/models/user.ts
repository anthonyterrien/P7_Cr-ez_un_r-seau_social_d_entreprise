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
