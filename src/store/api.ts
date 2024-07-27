import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../app/constants'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: BASE_URL,
    }),
    { maxRetries: 3 },
  ),
  tagTypes: ['EquipmentList', 'FavoriteEquipmentList', 'Equipment', 'HistoryList'],

  refetchOnFocus: true,
  endpoints: () => ({}),
})
