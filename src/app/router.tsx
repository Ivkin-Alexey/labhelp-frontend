import type { ReactNode } from 'react'
import { Suspense, useMemo } from 'react'
import React from 'react'

import { createBrowserRouter, Navigate } from 'react-router-dom'

import { routes } from './constants'
import { useAppSelector } from './hooks/hooks'
import Root from '../components/root'
import EquipmentPage from '../pages/equipment-page'
import MainPage from '../pages/main-page'
import SearchPage from '../pages/search-page'
import SignInPage from '../pages/sign-in-page'
import SignUpPage from '../pages/sign-up-page'
import { selectAccount } from '../store/selectors'

interface IRequireAuth {
  redirectTo: string
  component: React.ElementType
}

const FavoritesPage = React.lazy(() => import('../pages/favorites-page'))
const HistoryPage = React.lazy(() => import('../pages/history-page'))

function RequireAuth(props: IRequireAuth) {
  const { isAuth } = useAppSelector(selectAccount)

  if (!isAuth) {
    return <Navigate to={props.redirectTo} />
  }
  return <Suspense fallback={<div>Loading...</div>}><props.component/></Suspense>
}

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
        element: <RequireAuth component={FavoritesPage} redirectTo={routes.signIn} />,
      },
      {
        path: routes.history,
        element: <RequireAuth component={HistoryPage} redirectTo={routes.signIn} />,
      },
    ],
  },
])

export default router
