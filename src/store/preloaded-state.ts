import type { TAccountData } from '../models/users'

export interface State {
  account: {
    accountData: TAccountData | null
    token: string | null
    isAuth: boolean
  }
}

const accountData = localStorage.getItem('accountData')
const token = localStorage.getItem('token')

export const preloadedState: State = {
  account: {
    accountData: accountData ? JSON.parse(accountData) : null,
    token: token ? token : null,
    isAuth: Boolean(accountData),
  },
}
