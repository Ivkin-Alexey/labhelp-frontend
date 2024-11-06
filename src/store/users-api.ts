import { api } from './api'
import type { TAccountData, TLogin, IUserCredentials, IUserFormData } from '../models/users'

export const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<string, IUserCredentials>({
      query: credentials => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Equipment', 'EquipmentList', 'FavoriteEquipmentList', 'OperatingEquipmentList'],
    }),
    signUp: builder.mutation<string, IUserCredentials>({
      query: credentials => ({
        url: '/createNewPerson',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Equipment', 'EquipmentList', 'FavoriteEquipmentList', 'OperatingEquipmentList'],
    }),
    updatePersonData: builder.mutation<string, IUserFormData>({
      query: userFormData => ({
        url: '/updatePersonData',
        method: 'POST',
        body: userFormData,
      }),
      invalidatesTags: ['Equipment', 'EquipmentList', 'FavoriteEquipmentList', 'OperatingEquipmentList'],
    }),
    deletePerson: builder.mutation<string, {login: TLogin, deletedPersonLogin: TLogin}>({
      query: userFormData => ({
        url: '/updatePersonData',
        method: 'POST',
        body: userFormData,
      }),
      invalidatesTags: ['Equipment', 'EquipmentList', 'FavoriteEquipmentList', 'OperatingEquipmentList'],
    }),
    getAccountData: builder.query<TAccountData, TLogin>({
      query: login => '/person/' + login,
      providesTags: ['account'],
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation, useLazyGetAccountDataQuery, useUpdatePersonDataMutation, useDeletePersonMutation } = usersApi
