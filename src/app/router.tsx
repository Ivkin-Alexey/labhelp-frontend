import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import { routes } from './constants/constants'
import { RequireAuth, RequireAdminRole } from '../components/require-auth'
import Root from '../components/root'
import NotExistPage from '../pages/404-page'
import AdminPanel from '../pages/admin-panel'
import ContactsPage from '../pages/contacts'
import EquipmentPage from '../pages/equipment-page'
import FavoritesPage from '../pages/favorites-page'
import MainPage from '../pages/main-page'
import SearchPage from '../pages/search-page'
import SignInPage from '../pages/sign-in-page'
import SignUpPage from '../pages/sign-up-page'
import EditPersonalDataPage from '../pages/user-data-editing-page'

// const FavoritesPage = React.lazy(() => import('../pages/favorites-page'))
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
        path: routes[404],
        element: <NotExistPage />,
      },
      {
        // Временно открыто: избранные ids лежат в localStorage, страница не
        // требует авторизации. RequireAuth вернём вместе с серверным избранным
        // (см. TODO в store/api/equipment/equipments-api.ts)
        path: routes.favorites,
        element: <FavoritesPage />,
      },
      {
        path: routes.contacts,
        element: <ContactsPage />,
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
            <AdminPanel />
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
      {
        // Ловушка для всех неизвестных адресов: без неё любой односегментный
        // путь попадал бы в маршрут карточки оборудования
        path: routes.notFound,
        element: <NotExistPage />,
      },
    ],
  },
])

export default router
