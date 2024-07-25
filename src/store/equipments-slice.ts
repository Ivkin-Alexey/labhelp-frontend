import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  equipmentList: [],
}

export const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    setEquipmentList: (state, { payload: list }) => (state.equipmentList = list),
  },
})

export const { setEquipmentList } = equipmentSlice.actions

export default equipmentSlice.reducer