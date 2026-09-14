import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { RequireAdminRole, RequireAuth } from './require-auth'
import type { IAccountState } from '../models/users'
import { accountSlice } from '../store/users-slice'

// useLocation рендерим в дерево, чтобы проверить, куда и с каким state
// выполнился редирект
function LocationDump() {
  const location = useLocation()
  return <div data-testid="location">{JSON.stringify(location)}</div>
}

// В тестах важна только роль, остальные обязательные поля профиля заполняем
// приведением типа
const accountDataWithRole = (role: 'admin' | 'user') =>
  ({ role }) as unknown as IAccountState['accountData']

function makeStore(overrides: Partial<IAccountState>) {
  return configureStore({
    reducer: { account: accountSlice.reducer },
    preloadedState: {
      account: {
        isAuth: false,
        accountData: null,
        token: null,
        ...overrides,
      },
    },
  })
}

function renderGuard(
  element: JSX.Element,
  initialPath: string,
  overrides: Partial<IAccountState> = {},
) {
  return render(
    <Provider store={makeStore(overrides)}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="*" element={element} />
          <Route path="/signin" element={<LocationDump />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )
}

// location содержит ещё hash/key/search — сравниваем только то, что важно
function expectRedirectedTo(from: string) {
  const location = JSON.parse(screen.getByTestId('location').textContent ?? '{}')
  expect(location.pathname).toBe('/signin')
  expect(location.state).toEqual({ from })
}

describe('RequireAuth', () => {
  it('редиректит на signIn и сохраняет исходный путь в state.from', () => {
    renderGuard(
      <RequireAuth redirectTo="/signin">
        <div>secret</div>
      </RequireAuth>,
      '/history',
    )

    expect(screen.queryByText('secret')).not.toBeInTheDocument()
    expectRedirectedTo('/history')
  })

  it('пускает авторизованного пользователя', () => {
    renderGuard(
      <RequireAuth redirectTo="/signin">
        <div>secret</div>
      </RequireAuth>,
      '/history',
      { isAuth: true, accountData: accountDataWithRole('user') },
    )

    expect(screen.getByText('secret')).toBeInTheDocument()
  })
})

describe('RequireAdminRole', () => {
  it('редиректит не-админа на signIn и сохраняет путь админ-панели', () => {
    renderGuard(
      <RequireAdminRole redirectTo="/signin">
        <div>admin</div>
      </RequireAdminRole>,
      '/admin',
      { isAuth: true, accountData: accountDataWithRole('user') },
    )

    expect(screen.queryByText('admin')).not.toBeInTheDocument()
    expectRedirectedTo('/admin')
  })

  it('пускает администратора', () => {
    renderGuard(
      <RequireAdminRole redirectTo="/signin">
        <div>admin</div>
      </RequireAdminRole>,
      '/admin',
      { isAuth: true, accountData: accountDataWithRole('admin') },
    )

    expect(screen.getByText('admin')).toBeInTheDocument()
  })
})
