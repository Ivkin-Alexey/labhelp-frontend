import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../app/constants/constants'
import type { RootState } from '../store'

const exceptions = ['signIn', 'signUp']

export const api = createApi({
  reducerPath: 'api',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers, { getState, endpoint }) => {
        const state = getState() as RootState
        const { token } = state.account
        if (!exceptions.includes(endpoint) && token) {
          headers.set('authorization', `Bearer ${token}`)
          return headers
        }
      },
    }),
    { maxRetries: 3 },
  ),
  tagTypes: [
    'account',
    'EquipmentList',
    'FavoriteEquipmentList',
    'OperatingEquipmentList',
    'Equipment',
    'HistoryList',
  ],

  refetchOnFocus: true,
  endpoints: () => ({}),
})
