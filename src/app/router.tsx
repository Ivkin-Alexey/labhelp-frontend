import { createBrowserRouter, Link } from 'react-router-dom'

import Root from '../components/root'
import EquipmentPage from '../pages/equipment-page'
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
        path: '/:equipmentID',
        element: <EquipmentPage />,
      },
      {
        path: 'favourites',
        element: <FavouritesPage />,
      },
    ],
  },
])

export default router
