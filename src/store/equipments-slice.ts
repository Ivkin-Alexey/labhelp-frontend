import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  equipmentList: [],
  searchTerm: null,
  searchFilters: null
}

export const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    setEquipmentList: (state, { payload: list }) => (state.equipmentList = list),
    setSearchTerm: (state, { payload: searchTerm }) => (state.searchTerm = searchTerm),
    setSearchFilters: (state, { payload: filterState }) => (state.searchFilters = filterState)
  },
})

export const { setEquipmentList, setSearchTerm, setSearchFilters} = equipmentSlice.actions

export default equipmentSlice.reducer
