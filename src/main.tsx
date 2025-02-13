import React from 'react'

import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import router from './app/router'
import { store } from './store/store'
import FallbackRender from '../src/pages/fallback-render'

import './index.css'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <ErrorBoundary FallbackComponent={FallbackRender}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
