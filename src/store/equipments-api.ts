import { api } from './api'
import type { EquipmentItem } from '../models/equipments'

export const equipmentsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchEquipmentsByCategory: builder.query<EquipmentItem[], string>({
      query: (category) => `/equipmentList?category=${category}`,
    }),
  }),
})

export const { useFetchEquipmentsByCategoryQuery } = equipmentsApi
