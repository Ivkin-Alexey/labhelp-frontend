import { ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import router from './app/router'
import './index.css'
import FallbackRender from './pages/fallback-render'
import { store } from './store/store'
import theme from './theme'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <ErrorBoundary FallbackComponent={FallbackRender}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3} preventDuplicate>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
