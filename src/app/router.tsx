import { useMemo } from 'react'
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
  path: string
}

function RequireAuth(props: IRequireAuth) {
  const { isAuth } = useAppSelector(selectAccount)

  const FavoritesPage = useMemo(() => React.lazy(() => import('../pages/favorites-page')), [isAuth])
  const HistoryPage = useMemo(() => React.lazy(() => import('../pages/favorites-page')), [isAuth])

  if (!isAuth) {
    ;<Navigate to={props.redirectTo} />
  }

  if (props.path === routes.history) {
    return <HistoryPage />
  }
  if (props.path === routes.favorites) {
    return <FavoritesPage />
  }
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
        element: <RequireAuth path={routes.favorites} redirectTo={routes.signIn} />,
      },
      {
        path: routes.history,
        element: <RequireAuth path={routes.history} redirectTo={routes.signIn} />,
      },
    ],
  },
])

export default router
