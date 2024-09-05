import { api } from './api'
import { DEFAULT_SEARCH_TERM } from '../app/constants/constants'
import type { EquipmentID, EquipmentItem } from '../models/equipments'

export const equipmentsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchEquipmentByID: builder.query<EquipmentItem, string>({
      query: equipmentID => `/equipmentList?equipmentID=${equipmentID}`,
      providesTags: ['Equipment'],
    }),
    fetchEquipmentsBySearchTerm: builder.query<
      EquipmentItem[],
      { searchTerm: string; login: string }
    >({
      query: data => `/equipmentList?search=${data.searchTerm}&login=${data.login}`,
      providesTags: ['EquipmentList'],
    }),
    fetchFavoriteEquipments: builder.query<EquipmentItem[], string>({
      query: login => `/favoriteEquipments?login=${login}`,
      providesTags: ['FavoriteEquipmentList'],
    }),
    fetchOperatingEquipments: builder.query<EquipmentItem[], void>({
      query: (login) => `/workingEquipmentList?login=${login}`,
      providesTags: ['OperatingEquipmentList'],
    }),
    addOperatingEquipment: builder.mutation<string, { login: string; equipmentID: EquipmentID }>({
      query: data => ({
        url: '/operateEquipment',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FavoriteEquipmentList', 'Equipment'],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          equipmentsApi.util.updateQueryData(
            'fetchEquipmentsBySearchTerm',
            { searchTerm: DEFAULT_SEARCH_TERM, login: data.login },
            draft => 
              draft.forEach(el => {
                if (el.id === data.equipmentID) {
                  el.isOperate = true;
                  el.userID = data.login
                }
              }),
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    deleteOperatingEquipment: builder.mutation<string, { login: string; equipmentID: EquipmentID }>(
      {
        query: data => ({
          url: '/operateEquipment',
          method: 'DELETE',
          body: data,
        }),
        invalidatesTags: ['FavoriteEquipmentList', 'Equipment'],
        async onQueryStarted(data, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            equipmentsApi.util.updateQueryData(
              'fetchEquipmentsBySearchTerm',
              { searchTerm: DEFAULT_SEARCH_TERM, login: data.login },
              draft => 
                draft.forEach(el => {
                  if (el.id === data.equipmentID) {
                    delete el.isOperate
                    delete el.userID
                  }
                }),
            ),
          )
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
      },
    ),
    addFavoriteEquipment: builder.mutation<string, { login: string; equipmentID: EquipmentID }>({
      query: data => ({
        url: '/favoriteEquipment?add=true',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FavoriteEquipmentList', 'Equipment'],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          equipmentsApi.util.updateQueryData(
            'fetchEquipmentsBySearchTerm',
            { searchTerm: DEFAULT_SEARCH_TERM, login: data.login },
            draft => 
              draft.forEach(el => {
                if (el.id === data.equipmentID) {
                  el.isFavorite = true
                }
              }),
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    deleteFavoriteEquipment: builder.mutation<string, { login: string; equipmentID: EquipmentID }>({
      query: data => ({
        url: '/favoriteEquipment?remove=true',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FavoriteEquipmentList', 'Equipment'],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          equipmentsApi.util.updateQueryData(
            'fetchEquipmentsBySearchTerm',
            { searchTerm: DEFAULT_SEARCH_TERM, login: data.login },
            draft =>
              draft.forEach(el => {
                if (el.id === data.equipmentID) {
                  delete el.isFavorite
                }
              }),
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    fetchSearchHistory: builder.query<string, string>({
      query: login => ({
        url: `/equipmentSearchHistory?login=${login}`,
      }),
      providesTags: ['HistoryList'],
    }),
    addTermToHistory: builder.mutation<string, { login: string; term: string }>({
      query: data => ({
        url: '/equipmentSearchHistory?add=true',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['HistoryList'],
    }),
    deleteTermFromHistory: builder.mutation<string, { login: string; term: string }>({
      query: data => ({
        url: '/equipmentSearchHistory?remove=true',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['HistoryList'],
    }),
  }),
})

export const {
  useFetchEquipmentsBySearchTermQuery,
  useFetchOperatingEquipmentsQuery,
  useFetchFavoriteEquipmentsQuery,
  useFetchEquipmentByIDQuery,
  useAddFavoriteEquipmentMutation,
  useDeleteFavoriteEquipmentMutation,
  useAddTermToHistoryMutation,
  useDeleteTermFromHistoryMutation,
  useFetchSearchHistoryQuery,
  useAddOperatingEquipmentMutation,
  useDeleteOperatingEquipmentMutation,
} = equipmentsApi
