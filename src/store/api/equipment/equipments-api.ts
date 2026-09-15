import { apiRoutes } from '../../../app/constants/constants'
import { encodeQueryParams } from '../../../app/utils/utils'
import type {
  IEquipmentCount,
  IEquipmentItem,
  IEquipmentSearchResult,
  ISearchArg,
  TEquipmentFilters,
} from '../../../models/equipments'
import type { TLogin } from '../../../models/users'
import { api } from '../api'

export type TSyncStatus = 'pending' | 'success' | 'idle' | 'error'

// Бэкенд всегда отдает весь набор полей: во время синхронизации они заполнены,
// вне её приходят значения по умолчанию
export interface ISyncStatusDetail {
  status: TSyncStatus
  stage: string | null
  stageDescription: string | null
  progress: number
  error: string | null
  startedAt: string | null
  completedAt: string | null
  equipmentCount: number | null
  // id с дублями пары «инвентарный_заводской» в таблице: их стоит поправить
  collisions: string[] | null
}

export const equipmentsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchEquipmentByID: builder.query<IEquipmentItem, { equipmentId: string; login?: TLogin }>({
      // Id оборудования приходит из Google-таблицы и может содержать '/', '?'
      // и другие символы со спецзначением в URL. Без экранирования такой id
      // распадается на несколько сегментов пути и запрос уходит не в тот роут
      query: data => ({
        url: apiRoutes.get.equipments.equipments + '/' + encodeURIComponent(data.equipmentId),
        params: {
          login: data.login,
        },
      }),
      providesTags: ['Equipment'],
    }),
    fetchEquipmentByIDs: builder.query<
      IEquipmentItem[],
      { equipmentIds: string[]; login?: TLogin }
    >({
      query: ({ login, equipmentIds }) => ({
        url: apiRoutes.get.equipments.equipments,
        params: {
          ...{ login },
          ...{ equipmentIds },
        },
      }),
      transformResponse: (response: IEquipmentItem[]) =>
        response.map(item => ({
          ...item,
          isFavorite: true,
        })),
    }),
    fetchEquipmentsBySearchTerm: builder.query<IEquipmentSearchResult, ISearchArg>({
      query: data => {
        const { login, filters = {}, searchTerm, page, pageSize } = data

        const params = {
          ...(login && { login }),
          ...filters,
          ...(searchTerm && { term: searchTerm }),
          ...(page && { page }),
          ...(pageSize && { pageSize }),
        }
        return apiRoutes.get.equipments.search + encodeQueryParams(params)
      },
      providesTags: ['EquipmentList'],
    }),
    // TODO: избранное на сервере — задача на будущее. Сейчас избранные ids
    //  лежат в localStorage (favorite-equipment-middleware), чтобы списком могли
    //  пользоваться и незалогиненные пользователи.
    // fetchFavoriteEquipments: builder.query<IEquipmentItem[], string>({
    //   query: login => apiRoutes.get.equipments.favorite + login,
    //   transformResponse: (response: IEquipmentItem[]) => {
    //     return response.map(item => ({
    //       ...item,
    //       isFavorite: true,
    //     }))
    //   },
    //   providesTags: ['FavoriteEquipmentList'],
    // }),
    fetchFilters: builder.query<TEquipmentFilters, void>({
      query: () => apiRoutes.get.equipments.filters,
    }),
    fetchEquipmentsCount: builder.query<IEquipmentCount, void>({
      query: () => apiRoutes.get.equipments.count,
      providesTags: ['EquipmentList'],
    }),
    // TODO: см. комментарий выше — добавление/удаление избранного на сервере пока не используется
    // addFavoriteEquipment: builder.mutation<string, { login: string; equipmentId: equipmentId }>({
    //   query: data => ({
    //     url: apiRoutes.delete.equipments.favorite + data.equipmentId + `?login=${data.login}`,
    //     method: 'POST',
    //     body: data,
    //   }),
    //   invalidatesTags: [
    //     'FavoriteEquipmentList',
    //     'Equipment',
    //     'OperatingEquipmentList',
    //     'EquipmentList',
    //   ],
    // }),
    // deleteFavoriteEquipment: builder.mutation<string, { login: string; equipmentId: equipmentId }>({
    //   query: data => ({
    //     url: apiRoutes.delete.equipments.favorite + data.equipmentId + `?login=${data.login}`,
    //     method: 'DELETE',
    //     body: data,
    //   }),
    //   invalidatesTags: [
    //     'FavoriteEquipmentList',
    //     'Equipment',
    //     'OperatingEquipmentList',
    //     'EquipmentList',
    //   ],
    // }),
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
    syncEquipmentDb: builder.mutation<string, void>({
      query: () => ({
        url: apiRoutes.post.equipments.syncEquipmentDb,
        method: 'POST',
      }),
      invalidatesTags: ['EquipmentList', 'Equipment'],
    }),
    getSyncEquipmentDbStatus: builder.query<ISyncStatusDetail, void>({
      query: () => apiRoutes.get.equipments.syncStatus,
      providesTags: ['SyncStatus'],
    }),
  }),
})

export const {
  useFetchEquipmentsBySearchTermQuery,
  useLazyFetchEquipmentsBySearchTermQuery,
  // useFetchFavoriteEquipmentsQuery,
  useLazyFetchEquipmentByIDsQuery,
  useFetchEquipmentByIDQuery,
  useFetchEquipmentByIDsQuery,
  // useAddFavoriteEquipmentMutation,
  // useDeleteFavoriteEquipmentMutation,
  useAddTermToHistoryMutation,
  useDeleteTermFromHistoryMutation,
  useFetchSearchHistoryQuery,
  useFetchFiltersQuery,
  useFetchEquipmentsCountQuery,
  useSyncEquipmentDbMutation,
  useGetSyncEquipmentDbStatusQuery,
} = equipmentsApi
