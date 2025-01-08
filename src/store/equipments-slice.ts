import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  equipmentList: [],
  searchTerm: "",
  searchFilters: null
}

export const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    setEquipmentList: (state, { payload: list }) => void(state.equipmentList = list),
    setSearchTerm: (state, { payload: searchTerm }) => void(state.searchTerm = searchTerm),
    setSearchFilters: (state, { payload: filterState }) => void (state.searchFilters = filterState)
  },
})

export const { setEquipmentList, setSearchTerm, setSearchFilters} = equipmentSlice.actions

export default equipmentSlice.reducer
