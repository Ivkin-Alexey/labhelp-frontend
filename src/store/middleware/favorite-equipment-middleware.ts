import type { Middleware } from 'redux'

import { names } from '../../app/constants/localStorage'
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

  const { favoriteEquipments } = names.equipment

  if (isAction(action)) {
    const { type, payload } = action
    switch (type) {
      case 'equipments/addToFavorite':
        if (typeof payload === 'string') {
          const favoriteList = localStorage.getItem(favoriteEquipments)
          let arr = favoriteList ? JSON.parse(favoriteList) : []

          if (!arr.includes(payload)) {
            arr.push(payload)
            localStorage.setItem(favoriteEquipments, JSON.stringify(arr))
          } else {
            console.error(`Оборудование с ID ${payload} уже добавлено в избранное`)
          }
        }
        break

      case 'equipments/removeFromFavorite':
        if (typeof payload === 'string') {
          const favoriteList = localStorage.getItem(favoriteEquipments)
          if (favoriteList) {
            const arr = JSON.parse(favoriteList)
            const filteredArr = arr.filter((el: string) => el !== payload)
            localStorage.setItem(favoriteEquipments, JSON.stringify(filteredArr))
          }
        }
        break

      default:
        break
    }
  }

  return result
}
