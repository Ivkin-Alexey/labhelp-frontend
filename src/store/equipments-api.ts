import { api } from './api'
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
    addOperatingEquipment: builder.mutation<string, { login: string; equipmentID: EquipmentID }>({
      query: data => ({
        url: '/operateEquipment',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EquipmentList', 'FavoriteEquipmentList', 'Equipment'],
    }),
    deleteOperatingEquipment: builder.mutation<string, { login: string; equipmentID: EquipmentID }>(
      {
        query: data => ({
          url: '/operateEquipment',
          method: 'DELETE',
          body: data,
        }),
        invalidatesTags: ['EquipmentList', 'FavoriteEquipmentList', 'Equipment'],
      },
    ),
    addFavoriteEquipment: builder.mutation<string, { login: string; equipmentID: EquipmentID }>({
      query: data => ({
        url: '/favoriteEquipment?add=true',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EquipmentList', 'FavoriteEquipmentList', 'Equipment'],
    }),
    deleteFavoriteEquipment: builder.mutation<string, { login: string; equipmentID: EquipmentID }>({
      query: data => ({
        url: '/favoriteEquipment?remove=true',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['EquipmentList', 'FavoriteEquipmentList', 'Equipment'],
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
