import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  equipmentList: [],
  searchTerm: null
}

export const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    setEquipmentList: (state, { payload: list }) => (state.equipmentList = list),
    setSearchTerm: (state, {payload: searchTerm}) => (state.searchTerm = searchTerm)
  },
})

export const { setEquipmentList, setSearchTerm} = equipmentSlice.actions

export default equipmentSlice.reducer
