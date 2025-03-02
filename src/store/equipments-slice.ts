import { createSlice } from '@reduxjs/toolkit'

import type { IEquipmentsState } from '../models/store'

const initialState: IEquipmentsState = {
  searchTerm: '',
  searchFilters: null,
  searchQueryParams: '',
  favoriteList: [],
}

export const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    setSearchTerm: (state, { payload: searchTerm }) => {
      state.searchTerm = searchTerm
    },
    addToFavorite: (state, { payload: equipmentId }: { payload: string }) => {
      if (!state.favoriteList.includes(equipmentId)) {
        state.favoriteList.push(equipmentId)
      }
    },
    deleteFromFavorite: (state, { payload: equipmentId }: { payload: string }) => {
      state.favoriteList = state.favoriteList.filter(el => el !== equipmentId)
    },
    setSearchFilters: (state, { payload: filterState }) => {
      state.searchFilters = filterState
    },
    setSearchQueryParams: (state, { payload: searchQueryParams }) => {
      state.searchQueryParams = searchQueryParams
    },
    clearEquipmentSearch: state => {
      state.searchFilters = null
      state.searchQueryParams = ''
      state.searchTerm = ''
    },
  },
})

export const {
  setSearchTerm,
  setSearchFilters,
  setSearchQueryParams,
  clearEquipmentSearch,
  addToFavorite,
  deleteFromFavorite,
} = equipmentSlice.actions

export default equipmentSlice.reducer
