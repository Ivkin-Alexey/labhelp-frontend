import { names } from '../app/constants/localStorage'
import type { IState } from '../models/store'
const { equipment, account } = names

const accountData = localStorage.getItem(account.accountData)
const token = localStorage.getItem(account.token)
const favoriteList = localStorage.getItem(equipment.favoriteEquipments)

export const preloadedState: IState = {
  account: {
    accountData: accountData ? JSON.parse(accountData) : null,
    token: token ? token : null,
    // Без токена сессию восстановливать не из чего — сервер её всё равно не примет
    isAuth: Boolean(accountData && token),
  },
  equipments: {
    favoriteList: favoriteList ? JSON.parse(favoriteList) : [],
    searchFilters: null,
    searchQueryParams: '',
    searchTerm: '',
    searchResultPage: null,
  },
}
