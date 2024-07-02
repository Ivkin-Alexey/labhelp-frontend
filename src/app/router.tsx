import React from 'react'
import { createBrowserRouter, Link } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <h1>Главная страница</h1>
        <Link to="favourites">Избранное</Link>
      </div>
    ),
  },
  {
    path: 'favourites',
    element: (
      <div>
        <h1>Избранное</h1>
        <Link to="/">Главная</Link>
      </div>
    ),
  },
])

export default router
