import { api } from './api'
import type { EquipmentItem } from '../models/equipments'

export const equipmentsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchEquipmentsByCategory: builder.query<EquipmentItem[], string>({
      query: category => `/equipmentList?category=${category}`,
    }),
    fetchEquipmentByID: builder.query<EquipmentItem, string>({
      query: equipmentID => `/equipmentList?equipmentID=${equipmentID}`,
    }),
    fetchEquipmentsBySearchTerm: builder.query<EquipmentItem[], string>({
      query: searchTerm => `/equipmentList?search=${searchTerm}`,
    }),
  }),
})

export const {
  useFetchEquipmentsByCategoryQuery,
  useFetchEquipmentsBySearchTermQuery,
  useFetchEquipmentByIDQuery,
} = equipmentsApi
