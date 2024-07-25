import type { Dispatch, Middleware } from '@reduxjs/toolkit'

import type { State } from './preloaded-state'

interface MyAction {
  type: string
  payload?: boolean
}

export const authMiddleware: Middleware<{}, State, Dispatch<MyAction>> =
  store => next => action => {
    const result = next(action)
      localStorage.setItem('isAuth', JSON.stringify(store.getState().account.isAuth))
    return result
  }
