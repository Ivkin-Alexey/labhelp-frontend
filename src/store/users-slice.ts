import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AccountState {
  isAuth: boolean
}

const initialState: AccountState = {
  isAuth: JSON.parse(localStorage.getItem('isAuth') || 'false'),
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: state => {
      localStorage.setItem('isAuth', 'false')
      return { ...state, isAuth: false }
    },
    login: state => {
      localStorage.setItem('isAuth', 'true')
      return { ...state, isAuth: true }
    },
  },
})

export const { login, logout } = accountSlice.actions

export default accountSlice.reducer
