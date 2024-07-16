import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  equipmentList: [],
  searchValue: null
}

export const equipmentsSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    setEquipmentList: (state, { payload: list }) => (state.equipmentList = list),
    setSearchValue: (state, { payload: data }) => (state.searchValue = data),
  },
})

export const { setEquipmentList, setSearchValue } = equipmentsSlice.actions
