import type { Middleware } from 'redux'

import type { IUserData } from '../../models/users'
import type { State } from '../preloaded-state'

interface IAction {
  type: string
  payload?: IUserData | string
}

function isAction(obj: any): obj is IAction {
  return typeof obj === 'object' && obj !== null && typeof obj.type === 'string'
}

export const favoriteEquipmentMiddleware: Middleware<{}, State> = store => next => action => {
  const result = next(action)

  if (isAction(action)) {
    const {type, payload} = action
    switch (type) {
      case 'equipments/addToFavorite':
        if (typeof payload === 'string') {
          const favoriteList = localStorage.getItem('favoriteEquipment')
          if (favoriteList) {
            const arr = JSON.parse(favoriteList)
            arr.push(payload)
            localStorage.setItem('favoriteEquipment', JSON.stringify(arr))
          } else {
            localStorage.setItem('favoriteEquipment', JSON.stringify([payload]))
          }
        }
        break

      case 'equipments/removeFromFavorite':
        if (typeof payload === 'string') {
          const favoriteList = localStorage.getItem('favoriteEquipment')
          if (favoriteList) {
            const arr = JSON.parse(favoriteList)
            const filteredArr = arr.filter((el: string) => el !== payload)
            localStorage.setItem('favoriteEquipment', JSON.stringify(filteredArr))
          }
        }
        break

      default:
        break
    }
  }

  return result
}
