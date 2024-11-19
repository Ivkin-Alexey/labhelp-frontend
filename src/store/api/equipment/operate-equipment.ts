import { equipmentsApi } from './equipments-api'
import { apiRoutes, DEFAULT_SEARCH_TERM } from '../../../app/constants/constants'
import type { equipmentId, IEquipmentItem } from '../../../models/equipments'
import { api } from '../api'

export const operateEquipmentApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchOperatingEquipments: builder.query<IEquipmentItem[], void>({
      query: login => apiRoutes.get.equipments.operate + `?login=${login}`,
      providesTags: ['OperatingEquipmentList'],
    }),
    addOperatingEquipment: builder.mutation<string, { login: string; equipmentId: equipmentId }>({
      query: data => ({
        url: apiRoutes.post.equipments.operate + data.equipmentId + `?login=${data.login}`,
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
                if (el.id === data.equipmentId) {
                  el.isOperate = true
                  el.login = data.login
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
    deleteOperatingEquipment: builder.mutation<string, { login: string; equipmentId: equipmentId }>(
      {
        query: data => ({
          url: apiRoutes.delete.equipments.operate + data.equipmentId + `?login=${data.login}`,
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
                  if (el.id === data.equipmentId) {
                    delete el.isOperate
                    delete el.login
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
  }),
})

export const {
  useFetchOperatingEquipmentsQuery,
  useAddOperatingEquipmentMutation,
  useDeleteOperatingEquipmentMutation,
} = operateEquipmentApi
