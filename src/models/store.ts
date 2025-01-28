import type { TAccountData } from './users'

export interface IState {
  account: IAccountState
  equipments: IEquipmentsState
}

export interface IAccountState {
  accountData: TAccountData | null
  token: string | null
  isAuth: boolean
}

export interface IEquipmentsState {
  searchTerm: string
  searchFilters: null | any
  favoriteList: string[]
}
