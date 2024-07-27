import { createBrowserRouter, Navigate } from 'react-router-dom'

import { routes } from './constants'
import { useAppSelector } from './hooks/hooks'
import Root from '../components/root'
import EquipmentPage from '../pages/equipment-page'
import FavoritesPage from '../pages/favorites-page'
import HistoryPage from '../pages/history-page'
import MainPage from '../pages/main-page'
import SearchPage from '../pages/search-page'
import SignInPage from '../pages/sign-in-page'
import SignUpPage from '../pages/sign-up-page'
import { selectAccount } from '../store/selectors'

interface IRequireAuth {
  children: JSX.Element
  redirectTo: string
}

function RequireAuth(props: IRequireAuth) {
  const { isAuth } = useAppSelector(selectAccount)
  return isAuth ? props.children : <Navigate to={props.redirectTo} />
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
    ],
  },
])

export default router
