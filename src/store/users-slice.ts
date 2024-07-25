import { createSlice } from '@reduxjs/toolkit'

interface AccountState {
  isAuth: boolean
}

const initialState: AccountState = {
  isAuth: false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: state => {
      return { ...state, isAuth: false }
    },
    login: state => {
      return { ...state, isAuth: true }
    },
  },
})

export const { login, logout } = accountSlice.actions

export default accountSlice.reducer
