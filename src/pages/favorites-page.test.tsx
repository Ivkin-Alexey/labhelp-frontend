import type { ComponentType } from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import { names } from '../app/constants/localStorage'
import { addToFavorite, deleteFromFavorite } from '../store/equipments-slice'
import type { AppStore } from '../store/store'

// Ответ реального бэкенда на GET /equipments?equipmentIds=... (сокращён)
const EQUIPMENT = {
  isOperate: false,
  id: '201204328_2_A30784900376/A30704901386',
  serialNumber: 'A30784900376/A30704901386',
  inventoryNumber: '201204328',
  name: 'Спектрофотометр атомно-абсорбционный',
}

// preloaded-state читает localStorage на импорте модуля — как в браузере,
// где хранилище заполнено до загрузки бандла. Поэтому стор и страницу
// импортируем динамически ПОСЛЕ записи в localStorage (типы — статически,
// type-only импорты не исполняют модуль)
let FavoritesPage: ComponentType
let appStore: AppStore

beforeAll(async () => {
  localStorage.setItem(
    names.equipment.favoriteEquipments,
    JSON.stringify([EQUIPMENT.id]),
  )
  ;({ default: FavoritesPage } = await import('./favorites-page'))
  ;({ store: appStore } = await import('../store/store'))
})

function renderPage() {
  return render(
    <Provider store={appStore}>
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    </Provider>,
  )
}

describe('FavoritesPage', () => {
  afterEach(() => {
    localStorage.clear()
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('показывает карточки избранного оборудования', async () => {
    localStorage.setItem(
      names.equipment.favoriteEquipments,
      JSON.stringify([EQUIPMENT.id]),
    )
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response(JSON.stringify([EQUIPMENT]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    renderPage()

    // Запрос должен уйти на список id
    await waitFor(() => {
      expect(vi.mocked(fetch)).toHaveBeenCalled()
    })

    // И карточка должна появиться
    await waitFor(
      () => {
        expect(screen.getByText(EQUIPMENT.name)).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  it('сообщает, если сервер не нашёл ни одного id из избранного', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    renderPage()

    // Раньше в этом случае страница оставалась молча пустой: id в localStorage
    // есть, поэтому «Список пуст» не показывался, а карточек сервер не вернул
    await waitFor(() => {
      expect(
        screen.getByText('Оборудование из избранного не найдено. Возможно, список устарел — добавьте карточки заново'),
      ).toBeInTheDocument()
    })
  })

  it('при пустом списке избранного показывает «Список пуст»', () => {
    // Стор общий на файл (preloadedState читается один раз), поэтому очищаем
    // избранное экшеном, а не записью в localStorage
    appStore.dispatch(deleteFromFavorite(EQUIPMENT.id))

    renderPage()

    expect(screen.getByText('Список пуст')).toBeInTheDocument()

    appStore.dispatch(addToFavorite(EQUIPMENT.id))
  })
})
