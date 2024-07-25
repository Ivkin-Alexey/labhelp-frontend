import type { Action, Reducer, ThunkAction } from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import { equipmentSlice } from './equipments-slice'
import { accountSlice } from './users-slice'

const rootReducer: Reducer = combineReducers({
  equipments: equipmentSlice.reducer,
  account: accountSlice.reducer,
  [api.reducerPath]: api.reducer,
})
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})


export type AppStore = typeof store

export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
