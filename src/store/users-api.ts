import { api } from './api'
import type { TAccountData, TLogin, IUserCredentials } from '../models/users'

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<string, IUserCredentials>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Equipment', 'EquipmentList', 'FavoriteEquipmentList'],
    }),
    signUp: builder.mutation<string, IUserCredentials>({
      query: credentials => ({
        url: '/createNewPerson',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Equipment', 'EquipmentList', 'FavoriteEquipmentList'],
    }),
    getAccountData: builder.query<TAccountData, TLogin>({
      query: login => '/person/' + login,
      providesTags: ['account'],
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = usersApi
