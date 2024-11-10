import type { Middleware } from 'redux'

import type { State } from './preloaded-state'
import type { IUserData } from '../models/users'

interface IAction {
  type: string
  payload?: IUserData | string
}

function isAction(obj: any): obj is IAction {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.type === 'string' &&
    (typeof obj.payload === 'string' || typeof obj.payload === 'object')
  )
}

export const authMiddleware: Middleware<{}, State> = store => next => action => {
  const result = next(action)

  if (isAction(action)) {
    switch (action.type) {
      case 'account/setToken':
        if (typeof action.payload === 'string') {
          localStorage.setItem('token', action.payload)
        }
        break

      case 'account/setUserData':
        if (typeof action.payload === 'object') {
          localStorage.setItem('accountData', JSON.stringify(action.payload))
        }
        break

      default:
        break
    }
  }

  return result
}
