import { apiRoutes, DEFAULT_SEARCH_TERM } from '../../../app/constants/constants'
import type { equipmentId, IEquipmentItem, TEquipmentFilters } from '../../../models/equipments'
import type { TLogin } from '../../../models/users'
import { api } from '../api'

export const equipmentsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchEquipmentByID: builder.query<IEquipmentItem, { equipmentId: string; login: TLogin }>({
      query: data =>
        apiRoutes.get.equipments.equipments + '/' + data.equipmentId + '?login=' + data.login,
      providesTags: ['Equipment'],
    }),
    fetchEquipmentsBySearchTerm: builder.query<
      IEquipmentItem[],
      { searchTerm?: string; login: string; filters?: TEquipmentFilters }
    >({
      query: data =>
        apiRoutes.get.equipments.equipments +
        `?search=${data.searchTerm}&login=${data.login}&filters=${data.filters}`,
      providesTags: ['EquipmentList'],
    }),
    fetchFavoriteEquipments: builder.query<IEquipmentItem[], string>({
      query: login => apiRoutes.get.equipments.favorite + login,
      transformResponse: (response: IEquipmentItem[]) => {
        return response.map(item => ({
          ...item,
          isFavorite: true,
        }))
      },
      providesTags: ['FavoriteEquipmentList'],
    }),
    fetchFilters: builder.query<TEquipmentFilters, void>({
      query: () => apiRoutes.get.equipments.filters,
    }),
    addFavoriteEquipment: builder.mutation<string, { login: string; equipmentId: equipmentId }>({
      query: data => ({
        url: apiRoutes.delete.equipments.favorite + data.equipmentId + `?login=${data.login}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['FavoriteEquipmentList', 'Equipment', 'OperatingEquipmentList'],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          equipmentsApi.util.updateQueryData(
            'fetchEquipmentsBySearchTerm',
            { searchTerm: DEFAULT_SEARCH_TERM, login: data.login },
            draft =>
              draft.forEach(el => {
                if (el.id === data.equipmentId) {
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
    deleteFavoriteEquipment: builder.mutation<string, { login: string; equipmentId: equipmentId }>({
      query: data => ({
        url: apiRoutes.delete.equipments.favorite + data.equipmentId + `?login=${data.login}`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['FavoriteEquipmentList', 'Equipment', 'OperatingEquipmentList'],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          equipmentsApi.util.updateQueryData(
            'fetchEquipmentsBySearchTerm',
            { searchTerm: DEFAULT_SEARCH_TERM, login: data.login },
            draft =>
              draft.forEach(el => {
                if (el.id === data.equipmentId) {
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
        url: apiRoutes.get.equipments.searchHistory + login,
      }),
      providesTags: ['HistoryList'],
    }),
    addTermToHistory: builder.mutation<string, { login: string; term: string }>({
      query: data => ({
        url: apiRoutes.post.equipments.searchHistory + data.login + `?term=${data.term}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['HistoryList'],
    }),
    deleteTermFromHistory: builder.mutation<string, { login: string; term: string }>({
      query: data => ({
        url: apiRoutes.delete.equipments.searchHistory + data.login + `?term=${data.term}`,
        method: 'DELETE',
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
  useFetchFiltersQuery,
} = equipmentsApi
