import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    equipments: [],
}

export const equipmentsSlice = createSlice({
    name: "equipments",
    initialState,
    reducers: {
        setEquipmentList: (state, {payload: list}) => state.equipments = list,
    }
})

export const {actions, reducer} = equipmentsSlice