import { api } from './api'
import type { EquipmentID, EquipmentItem } from '../models/equipments'

export const equipmentsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchEquipmentByID: builder.query<EquipmentItem, { login: string; equipmentID: EquipmentID }>({
      queryFn: async (data, _queryApi, _extraOptions, baseQuery) => {
        const { data: equipment } = await baseQuery(
          `/equipmentList?equipmentID=${data.equipmentID}`,
        )
        if (data.login) {
          const { data: userFavoriteEquipmentList } = await baseQuery(
            `/favoriteEquipments?login=${data.login}`,
          )
          if (
            Array.isArray(userFavoriteEquipmentList) &&
            userFavoriteEquipmentList.find(el => el.id === data.equipmentID)
          ) {
            return { data: { ...(equipment as EquipmentItem), isFavorite: true } }
          }
        }
        return { data: equipment as EquipmentItem }
      },
      providesTags: ['Equipment'],
    }),
    fetchEquipmentsBySearchTerm: builder.query<
      EquipmentItem[],
      { searchTerm: string; login: string | false }
    >({
      queryFn: async (data, _queryApi, _extraOptions, baseQuery) => {
        const { data: equipmentList } = await baseQuery(`/equipmentList?search=${data.searchTerm}`)
        if (data.login) {
          const { data: userFavoriteEquipmentList } = await baseQuery(
            `/favoriteEquipments?login=${data.login}`,
          )
          if (Array.isArray(userFavoriteEquipmentList) && Array.isArray(equipmentList)) {
            if (userFavoriteEquipmentList.length === 0) {
              return { data: equipmentList as EquipmentItem[] }
            }
            const updatedEquipmentList = equipmentList.map(el => {
              if (userFavoriteEquipmentList.find(item => item.id === el.id)) {
                return { ...el, isFavorite: true }
              } else {
                return el
              }
            })
            return { data: updatedEquipmentList as EquipmentItem[] }
          }
        }
        return { data: equipmentList as EquipmentItem[] }
      },
      providesTags: ['EquipmentList'],
    }),
    fetchFavoriteEquipments: builder.query<EquipmentItem[], string>({
      query: login => `/favoriteEquipments?login=${login}`,
      providesTags: ['FavoriteEquipmentList'],
      transformResponse(res: EquipmentItem[]): EquipmentItem[] {
        return res.map(el => ({ ...el, isFavorite: true }))
      },
    }),
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
} = equipmentsApi
