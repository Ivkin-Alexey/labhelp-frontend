import { api } from './api'
import { apiRoutes } from '../../app/constants/constants'
import type { IFormValues } from '../../models/inputs'
import type {
  TAccountData,
  TLogin,
  IUserCredentials,
  IUserRegistrationData,
} from '../../models/users'
import { clearUserData, setToken, setUserData } from '../users-slice'

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    checkToken: builder.query<{ message: string; data: boolean }, void>({
      query: () => apiRoutes.get.users.isTokenValid,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (!data.data) {
            dispatch(clearUserData())
          }
        } catch (e) {
          // Сессия не подтверждена сервером (401/403) — разлогиниваем,
          // сетевые ошибки оставляем как есть, чтобы не выкидывать пользователя
          const status = (e as { status?: number })?.status
          if (status === 401 || status === 403) {
            dispatch(clearUserData())
          } else {
            console.error('Failed to check token: ', e)
          }
        }
      },
    }),
    signIn: builder.mutation<{ message: string; token: string }, IUserCredentials>({
      query: credentials => ({
        url: apiRoutes.post.auth.signIn + credentials.login,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.token && typeof data.token === 'string') {
            dispatch(setToken(data.token))
          } else {
            console.error('Token not found or not a string')
          }
        } catch (e) {
          console.error('Failed to login: ', e)
        }
      },
    }),
    signUp: builder.mutation<{ message: string; token: string }, IUserRegistrationData>({
      query: userData => ({
        url: apiRoutes.post.auth.signUp + userData.login,
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.token && typeof data.token === 'string') {
            dispatch(setToken(data.token))
          } else {
            console.error('Token not found or not a string')
          }
        } catch (e) {
          console.error('Failed to login: ', e)
        }
      },
      invalidatesTags: [
        'Equipment',
        'EquipmentList',
        'FavoriteEquipmentList',
        'OperatingEquipmentList',
      ],
    }),
    updatePersonData: builder.mutation<string, IFormValues>({
      query: userFormData => ({
        url: apiRoutes.patch.users + userFormData.login,
        method: 'PATCH',
        body: userFormData,
      }),
      invalidatesTags: ['userList'],
    }),
    deletePerson: builder.mutation<string, { login: TLogin; deletedPersonLogin: TLogin }>({
      query: userFormData => ({
        url: apiRoutes.delete.users + userFormData.deletedPersonLogin,
        method: 'DELETE',
        body: userFormData,
      }),
      invalidatesTags: ['userList'],
    }),
    getAccountData: builder.query<TAccountData, TLogin>({
      query: login => apiRoutes.get.users.userData + login,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserData(data))
        } catch (e) {
          console.error('Failed to get user data: ', e)
        }
      },
      providesTags: ['account'],
    }),
    getUserList: builder.query<TAccountData[], TLogin>({
      query: login => apiRoutes.get.users.users + '?login=' + login,
      providesTags: ['userList'],
    }),
  }),
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useLazyGetAccountDataQuery,
  useUpdatePersonDataMutation,
  useDeletePersonMutation,
  useCheckTokenQuery,
  useLazyCheckTokenQuery,
  useGetUserListQuery,
} = usersApi
