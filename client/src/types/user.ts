export enum UserVariant {
  social = 'Social media',
  frinds = 'Frinds',
  myself = 'Found myself',
}

export interface IUsers {
  totalCount: number
  users: IUser[]
}

export interface IUser {
  id: string
  name: string
  email: string
  hear: UserVariant
  birth: Date
  createdAt: string
  updatedAt: string
}
