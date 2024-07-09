import { createBrowserRouter, Link } from 'react-router-dom'

import Root from '../components/root'
import FavouritesPage from '../pages/favourites-page'
import MainPage from '../pages/main-page'

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
    ],
  },
])

export default router
