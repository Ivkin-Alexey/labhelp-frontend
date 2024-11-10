import { createSlice } from '@reduxjs/toolkit'

import type { TAccountData } from '../models/users'

interface AccountState {
  isAuth: boolean
  accountData: TAccountData | null
  jwtToken: string | null
}

const initialState: AccountState = {
  isAuth: false,
  accountData: null,
  jwtToken: null,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearUserData: state => {
      return { ...state, isAuth: false, accountData: null, jwtToken: null }
    },
    setUserData: (state, { payload: { accountData } }) => {
      return { ...state, isAuth: true, accountData }
    },
    setToken: (state, action: { payload: string }) => {
      state.jwtToken = action.payload
    },
  },
})

export const { setUserData, clearUserData, setToken } = accountSlice.actions

export default accountSlice.reducer
