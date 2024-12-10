import React, { useEffect } from 'react'

import { createBrowserRouter } from 'react-router-dom'

import { routes } from './constants/constants'
import { RequireAuth, RequireAdminRole } from '../components/require-auth'
import Root from '../components/root'
import AdminPage from '../pages/admin-page'
import EquipmentPage from '../pages/equipment-page'
import MainPage from '../pages/main-page'
import SearchPage from '../pages/search-page'
import SignInPage from '../pages/sign-in-page'
import SignUpPage from '../pages/sign-up-page'
import EditPersonalDataPage from '../pages/user-data-editing-page'

const FavoritesPage = React.lazy(() => import('../pages/favorites-page'))
const HistoryPage = React.lazy(() => import('../pages/history-page'))
const OperatingEquipmentsPage = React.lazy(() => import('../pages/operating-equipments-page'))

const router = createBrowserRouter([
  {
    path: routes.main,
    element: <Root />,
    // TODO: implement <ErrorPage />,
    children: [
      {
        path: routes.main,
        element: <MainPage />,
      },
      {
        path: routes.signIn,
        element: <SignInPage />,
      },
      {
        path: routes.signUp,
        element: <SignUpPage />,
      },
      {
        path: routes.equipment,
        element: <EquipmentPage />,
      },
      {
        path: routes.search,
        element: <SearchPage />,
      },
      {
        path: routes.favorites,
        element: (
          <RequireAuth redirectTo={routes.signIn}>
            <FavoritesPage />
          </RequireAuth>
        ),
      },
      {
        path: routes.history,
        element: (
          <RequireAuth redirectTo={routes.signIn}>
            <HistoryPage />
          </RequireAuth>
        ),
      },
      {
        path: routes.operatingEquipments,
        element: (
          <RequireAuth redirectTo={routes.signIn}>
            <OperatingEquipmentsPage />
          </RequireAuth>
        ),
      },
      {
        path: routes.admin,
        element: (
          <RequireAdminRole redirectTo={routes.signIn}>
            <AdminPage />
          </RequireAdminRole>
        ),
      },
      {
        path: routes.userProfile,
        element: (
          <RequireAdminRole redirectTo={routes.signIn}>
            <EditPersonalDataPage />
          </RequireAdminRole>
        ),
      },
    ],
  },
])

export default router
