import { ThemeProvider } from '@mui/material'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Search } from './search'
import { api } from '../../store/api/api'
import { equipmentSlice, setSearchFilters } from '../../store/equipments-slice'
import { accountSlice } from '../../store/users-slice'
import theme from '../../theme'

// Справочник фильтров приходит с сервера и в этих тестах не нужен
vi.mock('./equipment-filters', () => ({ default: () => null }))

const filterChanges = [
  { type: ['Осциллограф'] },
  { type: ['Осциллограф', 'Мультиметр'] },
  { kind: ['Импортное'] },
]

function renderSearch(fetchEquipments: ReturnType<typeof vi.fn>) {
  const store = configureStore({
    reducer: {
      equipments: equipmentSlice.reducer,
      account: accountSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  })

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/search']}>
          <Routes>
            <Route path="/search" element={<Search fetchEquipments={fetchEquipments} />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  )

  return store
}

describe('Search', () => {
  let fetchEquipments: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchEquipments = vi.fn()
  })

  it('рендирует поле поиска', () => {
    renderSearch(fetchEquipments)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('делает один запрос на каждое изменение фильтров', () => {
    const store = renderSearch(fetchEquipments)

    filterChanges.forEach(filters => {
      act(() => {
        store.dispatch(setSearchFilters(filters))
      })
    })

    expect(fetchEquipments).toHaveBeenCalledTimes(filterChanges.length)
  })

  it('передает в запрос выбранные фильтры', () => {
    const store = renderSearch(fetchEquipments)

    act(() => {
      store.dispatch(setSearchFilters({ type: ['Осциллограф'] }))
    })
    act(() => {
      store.dispatch(setSearchFilters({ kind: ['Импортное'] }))
    })

    expect(fetchEquipments).toHaveBeenLastCalledWith(
      expect.objectContaining({ filters: { kind: ['Импортное'] } }),
    )
  })
})
