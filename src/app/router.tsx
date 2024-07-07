import { createBrowserRouter, Link } from 'react-router-dom'

import Root from '../components/root'
import FavouritesPage from '../pages/favourites-page'
import MainPage from '../pages/main-page'
import SignInPage from '../pages/sign-in-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'favourites',
        element: <FavouritesPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
    ],
  },
])

export default router
