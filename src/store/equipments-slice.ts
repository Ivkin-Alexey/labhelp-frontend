import { createSlice } from '@reduxjs/toolkit'

const initialState: EquipmentState = {
  equipmentList: [],
  searchTerm: '',
  searchFilters: null,
  favoriteList: [],
};

export const equipmentSlice = createSlice({
  name: 'equipments',
  initialState,
  reducers: {
    setEquipmentList: (state, { payload: list }) => {
      state.equipmentList = list;
    },
    setSearchTerm: (state, { payload: searchTerm }) => {
      state.searchTerm = searchTerm;
    },
    addToFavorite: (state, { payload: equipmentId }: { payload: string }) => {
      state.favoriteList.push(equipmentId);
    },
    deleteFromFavorite: (state, { payload: equipmentId }: { payload: string }) => {
      state.favoriteList = state.favoriteList.filter(el => el !== equipmentId);
    },
    setSearchFilters: (state, { payload: filterState }) => {
      state.searchFilters = filterState;
    },
    clearEquipmentSearch: () => {
      return initialState;
    },
  },
});



export const { setEquipmentList, setSearchTerm, setSearchFilters, clearEquipmentSearch, addToFavorite, deleteFromFavorite } =
  equipmentSlice.actions

export default equipmentSlice.reducer
