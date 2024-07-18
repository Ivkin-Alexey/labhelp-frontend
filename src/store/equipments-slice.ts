import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  equipmentList: [],
}

export const equipmentsSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    setEquipmentList: (state, { payload: list }) => (state.equipmentList = list),
  },
})

export const { setEquipmentList } = equipmentsSlice.actions
