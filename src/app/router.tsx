import { createBrowserRouter, Link } from 'react-router-dom'

import Root from '../components/root'
import FavouritesPage from '../pages/favourites-page'
import MainPage from '../pages/main-page'
import SearchPage from '../pages/search-page'

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
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
])

export default router
