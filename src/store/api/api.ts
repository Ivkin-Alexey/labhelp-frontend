import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import type { FetchArgs } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../../app/constants/constants'
import type { RootState } from '../store'

const exceptions = ['signIn', 'signUp']

const MAX_RETRIES = 3

function isGetRequest(args: unknown) {
  const method = typeof args === 'string' ? 'GET' : ((args as FetchArgs)?.method ?? 'GET')
  return method.toUpperCase() === 'GET'
}

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
    {
      // Повторяем только GET-запросы: повтор мутиаций (POST/PATCH/DELETE) может
      // дать побочный эффект на сервере — например, повторно запустить синхронизацию БД
      retryCondition: (_error, args, { attempt }) => attempt <= MAX_RETRIES && isGetRequest(args),
    },
  ),
  tagTypes: [
    'account',
    'userList',
    'EquipmentList',
    'FavoriteEquipmentList',
    'OperatingEquipmentList',
    'Equipment',
    'HistoryList',
    'SyncStatus',
  ],

  refetchOnFocus: true,
  endpoints: () => ({}),
})
