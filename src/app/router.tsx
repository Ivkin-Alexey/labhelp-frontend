import { createBrowserRouter, Navigate } from 'react-router-dom'

import { routes } from './constants'
import { useAppSelector } from './hooks/hooks'
import Root from '../components/root'
import EquipmentPage from '../pages/equipment-page'
import FavoritesPage from '../pages/favorites-page'
import MainPage from '../pages/main-page'
import SearchPage from '../pages/search-page'
import SignInPage from '../pages/sign-in-page'
import SignUpPage from '../pages/sign-up-page'

interface IRequireAuth {
  children: JSX.Element
  redirectTo: string
}

function RequireAuth(props: IRequireAuth) {
  const { isAuth } = useAppSelector(state => state.account)
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
        path: routes.favorites,
        element: (
          <RequireAuth redirectTo={routes.signIn}>
            <FavoritesPage />
          </RequireAuth>
        ),
      },
      {
        path: routes.search,
        element: <SearchPage />,
      },
    ],
  },
])

export default router
