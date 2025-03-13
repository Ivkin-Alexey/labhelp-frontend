import type { RootState } from './store'

export const selectState = (state: RootState) => state

export const selectLogin = (state: RootState) => state.account.accountData?.login

export const selectAccount = (state: RootState) => state.account

export const selectIsAuth = (state: RootState) => state.account.isAuth

export const selectToken = (state: RootState) => state.account.token

export const selectRole = (state: RootState) => state.account.accountData?.role

export const selectFavoriteEquipmentsFromLS = (state: RootState) => state.equipments.favoriteList

export const selectEquipmentSearchFilters = (state: RootState) => state.equipments.searchFilters

export const selectEquipmentSearchTerm = (state: RootState) => state.equipments.searchTerm

export const selectSearchResultPage = (state: RootState) => state.equipments.searchResultPage

export const selectEquipmentSearchQueryParams = (state: RootState) => state.equipments.searchQueryParams
