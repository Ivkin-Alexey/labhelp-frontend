import type { Middleware } from 'redux'
import { beforeEach, describe, expect, it } from 'vitest'

import { authMiddleware } from './auth-middleware'
import { names } from '../../app/constants/localStorage'
// Middleware работает только с localStorage, поэтому хранилище можно заглушить
function dispatchAction(middleware: Middleware, action: unknown) {
  const store = { getState: () => undefined, dispatch: () => undefined } as never

  return middleware(store)(() => undefined)(action)
}

const accountKeys = Object.values(names.account)

describe('authMiddleware', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('сохраняет токен', () => {
    dispatchAction(authMiddleware, { type: 'account/setToken', payload: 'token-123' })

    expect(localStorage.getItem(names.account.token)).toBe('token-123')
  })

  it('сохраняет данные аккаунта', () => {
    dispatchAction(authMiddleware, {
      type: 'account/setUserData',
      payload: { login: 'ivanov', role: 'user' },
    })

    expect(localStorage.getItem(names.account.accountData)).toBe(
      JSON.stringify({ login: 'ivanov', role: 'user' }),
    )
  })

  it('при логауте удаляет только данные аккаунта, избранное остаётся', () => {
    localStorage.setItem(names.account.token, 'token-123')
    localStorage.setItem(names.account.accountData, JSON.stringify({ login: 'ivanov' }))
    localStorage.setItem(names.equipment.favoriteEquipments, JSON.stringify(['equipment-1']))
    // Ключ, оставшийся у пользователей со старой версии, тоже должен уйти
    localStorage.setItem('isAuth', 'true')

    dispatchAction(authMiddleware, { type: 'account/clearUserData' })

    accountKeys.forEach(key => expect(localStorage.getItem(key)).toBeNull())
    expect(localStorage.getItem('isAuth')).toBeNull()
    expect(localStorage.getItem(names.equipment.favoriteEquipments)).toBe(
      JSON.stringify(['equipment-1']),
    )
  })
})
