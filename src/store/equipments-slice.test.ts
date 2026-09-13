import equipmentReducer, {
  addToFavorite,
  clearEquipmentSearch,
  deleteFromFavorite,
  setSearchFilters,
  setSearchQueryParams,
  setSearchResultPage,
  setSearchTerm,
} from './equipments-slice'
import type { IEquipmentsState } from '../models/store'

const initialState: IEquipmentsState = {
  searchTerm: '',
  searchFilters: null,
  searchQueryParams: '',
  favoriteList: [],
  searchResultPage: null,
}

describe('equipments slice', () => {
  it('возвращает начальное состояние', () => {
    expect(equipmentReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('сохраняет поисковый запрос', () => {
    const state = equipmentReducer(initialState, setSearchTerm('stanok'))

    expect(state.searchTerm).toBe('stanok')
  })

  it('добавляет оборудование в избранное', () => {
    const state = equipmentReducer(initialState, addToFavorite('equipment-1'))

    expect(state.favoriteList).toEqual(['equipment-1'])
  })

  it('не добавляет дубликаты в избранное', () => {
    const state = equipmentReducer(
      { ...initialState, favoriteList: ['equipment-1'] },
      addToFavorite('equipment-1'),
    )

    expect(state.favoriteList).toEqual(['equipment-1'])
  })

  it('удаляет оборудование из избранного', () => {
    const state = equipmentReducer(
      { ...initialState, favoriteList: ['equipment-1', 'equipment-2'] },
      deleteFromFavorite('equipment-1'),
    )

    expect(state.favoriteList).toEqual(['equipment-2'])
  })

  it('сохраняет фильтры и параметры поиска', () => {
    const filters = { category: 'Студент' }
    const withFilters = equipmentReducer(initialState, setSearchFilters(filters))
    const state = equipmentReducer(withFilters, setSearchQueryParams('?category=student'))

    expect(state.searchFilters).toEqual(filters)
    expect(state.searchQueryParams).toBe('?category=student')
  })

  it('сохраняет номер страницы результатов', () => {
    const state = equipmentReducer(initialState, setSearchResultPage(3))

    expect(state.searchResultPage).toBe(3)
  })

  it('меняет только поисковый запрос', () => {
    const state = equipmentReducer(
      { ...initialState, searchTerm: 'stanok', searchResultPage: 2, favoriteList: ['equipment-1'] },
      setSearchTerm(''),
    )

    expect(state).toEqual({
      ...initialState,
      searchResultPage: 2,
      favoriteList: ['equipment-1'],
    })
  })

  it('очищает строку, фильтры и параметры, но сохраняет избранное и страницу', () => {
    const state = equipmentReducer(
      {
        ...initialState,
        searchTerm: 'stanok',
        searchFilters: { category: 'Студент' },
        searchQueryParams: '?q=stanok',
        favoriteList: ['equipment-1'],
        searchResultPage: 2,
      },
      clearEquipmentSearch(),
    )

    expect(state).toEqual({
      ...initialState,
      favoriteList: ['equipment-1'],
      searchResultPage: 2,
    })
  })
})
