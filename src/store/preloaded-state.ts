import type { IEquipmentItem } from '../models/equipments'
import { TAccountData } from '../models/users'

export interface State {
  equipments: [] | IEquipmentItem[]
  account: {
    accountData: TAccountData | null
    isAuth: boolean
  }
}

const isAuth = localStorage.getItem('isAuth')
const accountData = localStorage.getItem('accountData')

export const preloadedState: State = {
  equipments: [],
  account: {
    isAuth: isAuth ? JSON.parse(isAuth) : false,
    accountData: accountData ? JSON.parse(accountData) : null,
  },
}
