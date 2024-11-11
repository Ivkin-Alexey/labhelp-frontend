import { createSlice } from '@reduxjs/toolkit'

import type { IAccountState } from '../models/users'

const initialState: IAccountState = {
  isAuth: false,
  accountData: null,
  token: null,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearUserData: state => ({ ...state, ...initialState }),
    setUserData: (state, { payload }) => ({ ...state, accountData: payload, isAuth: true }),
    setToken: (state, { payload }) => ({ ...state, token: payload }),
  }
})

export const { setUserData, clearUserData, setToken } = accountSlice.actions

export default accountSlice.reducer
