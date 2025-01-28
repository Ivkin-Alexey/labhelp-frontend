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
          localStorage.setItem(names.token, action.payload)
        }
        break

      case 'account/setUserData':
        if (typeof action.payload === 'object') {
          localStorage.setItem(names.accountData, JSON.stringify(action.payload))
          localStorage.setItem(names.isAuth, JSON.stringify(true))
        }
        break

      case 'account/clearUserData':
        localStorage.clear()
        break

      default:
        break
    }
  }

  return result
}
