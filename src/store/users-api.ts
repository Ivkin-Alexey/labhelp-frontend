import { api } from './api'
import { setToken, setUserData } from './users-slice'
import type {
  TAccountData,
  TLogin,
  IUserCredentials,
  IUserData,
  IUserRegistrationData,
} from '../models/users'

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<{ message: string; token: string }, IUserCredentials>({
      query: credentials => ({
        url: '/login',
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
    signUp: builder.mutation<string, { userData: IUserRegistrationData }>({
      query: userData => ({
        url: '/createNewPerson',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data }: { data: string } = await queryFulfilled
          dispatch(setToken(data))
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
        url: '/updatePersonData',
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
        url: '/updatePersonData',
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
    getAccountData: builder.query<TAccountData, TLogin>({
      query: login => '/person/' + login,
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
