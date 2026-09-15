import type { Middleware } from 'redux'

import { names } from '../../app/constants/localStorage'
import type { IState } from '../../models/store'
import type { IUserData } from '../../models/users'

interface IAction {
  type: string
  payload?: IUserData | string
}

function isAction(obj: any): obj is IAction {
  return typeof obj === 'object' && obj !== null && typeof obj.type === 'string'
}

export const authMiddleware: Middleware<{}, IState> = store => next => action => {
  const result = next(action)

  if (isAction(action)) {
    switch (action.type) {
      case 'account/setToken':
        if (typeof action.payload === 'string') {
          localStorage.setItem(names.account.token, action.payload)
        }
        break

      case 'account/setUserData':
        if (typeof action.payload === 'object') {
          localStorage.setItem(names.account.accountData, JSON.stringify(action.payload))
        }
        break

      case 'account/clearUserData':
        // Логаут должен удалять только данные аккаунта: избранный список и
        // остальные ключи принадлежат пользователю и не зависят от сессии
        Object.values(names.account).forEach(key => localStorage.removeItem(key))
        // isAuth раньше писался в localStorage, но никогда не читался: при
        // загрузке страницы isAuth вычисляется из accountData и token.
        // Подчищаем ключ, оставшийся у пользователей со старой версии
        localStorage.removeItem('isAuth')
        break

      default:
        break
    }
  }

  return result
}
