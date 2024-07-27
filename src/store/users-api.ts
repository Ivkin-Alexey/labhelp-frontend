import { api } from './api'
import type { UserCredentials } from '../models/users'

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<string, UserCredentials>({
      query: credentials => ({
        url: "/login",
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Equipment', 'EquipmentList', 'FavoriteEquipmentList'],
    }),
    signUp: builder.mutation<string, UserCredentials>({
      query: credentials => ({
        url: "/createNewPerson",
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Equipment', 'EquipmentList', 'FavoriteEquipmentList'],
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation } = usersApi
