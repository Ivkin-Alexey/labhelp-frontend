import { describe, expect, it } from 'vitest'

import { accountSlice, clearUserData, setToken, setUserData } from './users-slice'

const reducer = accountSlice.reducer

const initialState = { accountData: null, token: null, isAuth: false }

describe('accountSlice', () => {
  it('кладёт токен в состояние', () => {
    expect(reducer(initialState, setToken('token-123')).token).toBe('token-123')
  })

  it('помечает пользователя авторизованным при получении данных аккаунта', () => {
    const accountData = { login: 'ivanov', role: 'user' }
    const state = reducer({ ...initialState, token: 'token-123' }, setUserData(accountData))

    expect(state.accountData).toEqual(accountData)
    expect(state.isAuth).toBe(true)
  })

  it('полностью разлогинивает', () => {
    const logged = reducer(
      { ...initialState, token: 'token-123' },
      setUserData({ login: 'ivanov', role: 'user' }),
    )

    expect(reducer(logged, clearUserData())).toEqual(initialState)
  })
})
