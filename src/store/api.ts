import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

import type { RootState } from './store'
import { BASE_URL } from '../app/constants/constants'

const exceptions = ['signIn', 'signUp']

export const api = createApi({
  reducerPath: 'api',
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: BASE_URL,
      prepareHeaders: (headers, { getState, endpoint }) => {
        console.log(endpoint)
        if (!exceptions.includes(endpoint)) {
          const state = getState() as RootState
          const token = state.account.token
          console.log(token)
          if (token) {
            headers.set('authorization', `Bearer ${token}`)
          }
          console.error('JWT-токен отсутствует')
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
