import type { Middleware } from 'redux'
import { beforeEach, describe, expect, it } from 'vitest'

import { favoriteEquipmentMiddleware } from './favorite-equipment-middleware'
import { names } from '../../app/constants/localStorage'

// Middleware работает только с localStorage, поэтому хранилище можно заглушить
function dispatchAction(middleware: Middleware, action: unknown) {
  const store = { getState: () => undefined, dispatch: () => undefined } as never

  return middleware(store)(() => undefined)(action)
}

function getFavoriteIds() {
  const raw = localStorage.getItem(names.equipment.favoriteEquipments)

  return raw ? JSON.parse(raw) : null
}

describe('favoriteEquipmentMiddleware', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('кладёт id в localStorage при добавлении в избранное', () => {
    dispatchAction(favoriteEquipmentMiddleware, {
      type: 'equipments/addToFavorite',
      payload: 'equipment-1',
    })

    expect(getFavoriteIds()).toEqual(['equipment-1'])
  })

  it('не дублирует id, который уже в избранном', () => {
    localStorage.setItem(names.equipment.favoriteEquipments, JSON.stringify(['equipment-1']))

    dispatchAction(favoriteEquipmentMiddleware, {
      type: 'equipments/addToFavorite',
      payload: 'equipment-1',
    })

    expect(getFavoriteIds()).toEqual(['equipment-1'])
  })

  it('удаляет id из localStorage при удалении из избранного', () => {
    localStorage.setItem(
      names.equipment.favoriteEquipments,
      JSON.stringify(['equipment-1', 'equipment-2']),
    )

    dispatchAction(favoriteEquipmentMiddleware, {
      type: 'equipments/deleteFromFavorite',
      payload: 'equipment-1',
    })

    expect(getFavoriteIds()).toEqual(['equipment-2'])
  })
})
