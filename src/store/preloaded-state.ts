import type { TAccountData } from '../models/users'

const accountData = localStorage.getItem('accountData')
const token = localStorage.getItem('token')
const favorite = localStorage.getItem('favoriteEquipment')

export const preloadedState: State = {
  account: {
    accountData: accountData ? JSON.parse(accountData) : null,
    token: token ? token : null,
    isAuth: Boolean(accountData),
  },
  equipments: {
    favorite: favorite ? JSON.parse(favorite) : null,
  }
}
