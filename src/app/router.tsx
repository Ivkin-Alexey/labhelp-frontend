import React, { Suspense } from 'react'

import { createBrowserRouter } from 'react-router-dom'

import { routes } from './constants/constants'
import ErrorPage from '../components/error-page/error-page'
import Fallback from '../components/Fallback'
import { RequireAuth, RequireAdminRole } from '../components/require-auth'
import Root from '../components/root'
import MainPage from '../pages/main-page'

// Ленивые страницы грузятся отдельными чанками, поэтому под них нужен
// Suspense с фолбэком на время загрузки
function lazyPage(element: JSX.Element) {
  return <Suspense fallback={Fallback()}>{element}</Suspense>
}

// Главная остаётся в основном бандле, чтобы открывалась без лишнего запроса.
// Остальные страницы ленивые: их код грузится только при переходе
const NotExistPage = React.lazy(() => import('../pages/404-page'))
const AdminPanel = React.lazy(() => import('../pages/admin-panel'))
const ContactsPage = React.lazy(() => import('../pages/contacts'))
const EquipmentPage = React.lazy(() => import('../pages/equipment-page'))
const FavoritesPage = React.lazy(() => import('../pages/favorites-page'))
const SearchPage = React.lazy(() => import('../pages/search-page'))
const SignInPage = React.lazy(() => import('../pages/sign-in-page'))
const SignUpPage = React.lazy(() => import('../pages/sign-up-page'))
const EditPersonalDataPage = React.lazy(() => import('../pages/user-data-editing-page'))
const HistoryPage = React.lazy(() => import('../pages/history-page'))
const OperatingEquipmentsPage = React.lazy(() => import('../pages/operating-equipments-page'))

const router = createBrowserRouter([
  {
    path: routes.main,
    element: <Root />,
    // Без errorElement ошибки рендера страниц рисовал бы дефолтный экран
    // react-router («Unexpected Application Error!»)
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.main,
        element: <MainPage />,
      },
      {
        path: routes.signIn,
        element: lazyPage(<SignInPage />),
      },
      {
        path: routes.signUp,
        element: lazyPage(<SignUpPage />),
      },
      {
        path: routes.equipment,
        element: lazyPage(<EquipmentPage />),
      },
      {
        path: routes.search,
        element: lazyPage(<SearchPage />),
      },
      {
        path: routes[404],
        element: lazyPage(<NotExistPage />),
      },
      {
        // Временно открыто: избранные ids лежат в localStorage, страница не
        // требует авторизации. RequireAuth вернём вместе с серверным избранным
        // (см. TODO в store/api/equipment/equipments-api.ts)
        path: routes.favorites,
        element: lazyPage(<FavoritesPage />),
      },
      {
        path: routes.contacts,
        element: lazyPage(<ContactsPage />),
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
        element: lazyPage(<NotExistPage />),
      },
    ],
  },
])

export default router
