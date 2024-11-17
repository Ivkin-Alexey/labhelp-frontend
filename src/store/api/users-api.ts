import { api } from './api'
import { apiRoutes } from '../../app/constants/constants'
import type {
  TAccountData,
  TLogin,
  IUserCredentials,
  IUserData,
  IUserRegistrationData,
} from '../../models/users'
import { setToken, setUserData } from '../users-slice'

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
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
    signUp: builder.mutation<
      { message: string; token: string },
      { userData: IUserRegistrationData }
    >({
      query: userData => ({
        url: apiRoutes.post.users.signUp + userData.userData.login,
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
    updatePersonData: builder.mutation<string, IUserData>({
      query: userFormData => ({
        url: apiRoutes.patch.users + userFormData.login,
        method: 'POST',
        body: userFormData,
      }),
      invalidatesTags: [
        'Equipment',
        'EquipmentList',
        'FavoriteEquipmentList',
        'OperatingEquipmentList',
      ],
    }),
    deletePerson: builder.mutation<string, { login: TLogin; deletedPersonLogin: TLogin }>({
      query: userFormData => ({
        url: apiRoutes.delete.users + userFormData.deletedPersonLogin,
        method: 'DELETE',
        body: userFormData,
      }),
      invalidatesTags: [
        'Equipment',
        'EquipmentList',
        'FavoriteEquipmentList',
        'OperatingEquipmentList',
      ],
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
  }),
})

export const {
  useSignInMutation,
  useSignUpMutation,
  useLazyGetAccountDataQuery,
  useUpdatePersonDataMutation,
  useDeletePersonMutation,
} = usersApi
