import type { TAccountData } from './users'

export interface State {
  account: {
    accountData: TAccountData | null
    token: string | null
    isAuth: boolean
  }
  equipments: {
    searchTerm: string
    searchFilters: null | any
    favoriteList: string[]
  }
}
