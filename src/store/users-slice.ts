import { createSlice } from '@reduxjs/toolkit'

interface AccountState {
  isAuth: boolean
  login: string | false
}

const initialState: AccountState = {
  isAuth: false,
  login: false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      return { ...state, isAuth: false, login: false }
    },
    login: (state, { payload: login }) => {
      return { ...state, isAuth: true, login }
    },
  },
})

export const { login, logout } = accountSlice.actions

export default accountSlice.reducer
