import type { Action, Reducer, ThunkAction } from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { api } from './api/api'
import { equipmentSlice } from './equipments-slice'
import { authMiddleware } from './middleware/auth-middleware'
import { favoriteEquipmentMiddleware } from './middleware/favorite-equipment-middleware'
import { preloadedState } from './preloaded-state'
import { accountSlice } from './users-slice'

const rootReducer: Reducer = combineReducers({
  equipments: equipmentSlice.reducer,
  account: accountSlice.reducer,
  [api.reducerPath]: api.reducer,
})
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(authMiddleware)
      .concat(favoriteEquipmentMiddleware),
})

export type AppStore = typeof store

export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
