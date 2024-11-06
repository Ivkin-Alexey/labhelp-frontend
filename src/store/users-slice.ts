import { createSlice } from '@reduxjs/toolkit'
import { TAccountData } from '../models/users'

interface AccountState {
  isAuth: boolean
  accountData: TAccountData | null
}

const initialState: AccountState = {
  isAuth: false,
  accountData: null
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: state => {
      return { ...state, isAuth: false, accountData: null }
    },
    login: (state, { payload: accountData }) => {
      return { ...state, isAuth: true, accountData: accountData }
    },
  },
})

export const { login, logout } = accountSlice.actions

export default accountSlice.reducer
