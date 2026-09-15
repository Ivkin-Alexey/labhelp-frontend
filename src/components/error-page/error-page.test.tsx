import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ErrorPage, { ErrorContent, isChunkLoadError } from './error-page'
import reloadPage from './reload-page'

vi.mock('./reload-page', () => ({ default: vi.fn() }))

const CHUNK_ERROR =
  'TypeError: Failed to fetch dynamically imported module: https://labspmi.ru/assets/carousel-C5oUIVlh.js'

function Boom({ message }: { message: string }): JSX.Element {
  throw new Error(message)
}

// Важно: только data-роутер (createBrowserRouter/createMemoryRouter) ловит
// ошибки рендера через errorElement — декларативный MemoryRouter их не ловит
function renderRouterError(message: string) {
  const router = createMemoryRouter(
    [
      { path: '/boom', element: <Boom message={message} />, errorElement: <ErrorPage /> },
      { path: '/', element: <div>main</div> },
    ],
    { initialEntries: ['/boom'] },
  )

  return render(<RouterProvider router={router} />)
}

describe('isChunkLoadError', () => {
  it('распознаёт сбои загрузки чанков в формулировках разных браузеров', () => {
    expect(isChunkLoadError(new Error(CHUNK_ERROR))).toBe(true)
    expect(isChunkLoadError(new Error('Importing a module script failed.'))).toBe(true)
    expect(isChunkLoadError(new Error('Loading chunk 4 failed'))).toBe(true)
  })

  it('обычные ошибки чанками не считаются', () => {
    expect(isChunkLoadError(new Error('boom'))).toBe(false)
    expect(isChunkLoadError(undefined)).toBe(false)
  })
})

describe('ErrorPage (errorElement роутера)', () => {
  afterEach(() => {
    sessionStorage.clear()
    vi.clearAllMocks()
  })

  it('показывает понятный экран с кнопками вместо Unexpected Application Error', () => {
    renderRouterError('boom')

    expect(screen.getByRole('alert')).toHaveTextContent('Что-то пошло не так')
    expect(screen.getByRole('button', { name: 'Перезагрузить страницу' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'На главную' })).toBeInTheDocument()
    // Сообщение исходной ошибки видно мелким шрифтом — помогает при разборе
    expect(screen.getByText('boom')).toBeInTheDocument()
  })

  it('ошибку чанка лечит авто-перезагрузкой', () => {
    renderRouterError(CHUNK_ERROR)

    expect(vi.mocked(reloadPage)).toHaveBeenCalledTimes(1)
    // Метка защищает от зацикливания, если сбой повторится после перезагрузки
    expect(sessionStorage.getItem('labhelp:chunk-reload-at')).not.toBeNull()
  })

  it('повторная ошибка чанка не зацикливается, а показывает кнопку', async () => {
    sessionStorage.setItem('labhelp:chunk-reload-at', String(Date.now()))

    renderRouterError(CHUNK_ERROR)

    expect(vi.mocked(reloadPage)).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Перезагрузить страницу' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Перезагрузить страницу' }))
    expect(vi.mocked(reloadPage)).toHaveBeenCalledTimes(1)
  })

  it('обычная ошибка авто-перезагрузку не запускает', () => {
    renderRouterError('boom')

    expect(vi.mocked(reloadPage)).not.toHaveBeenCalled()
  })
})

describe('ErrorContent (верхнеуровневая граница в main.tsx)', () => {
  afterEach(() => {
    sessionStorage.clear()
    vi.clearAllMocks()
  })

  it('без роутера рендерится без ссылки на главную', () => {
    render(<ErrorContent error={new Error('boom')} />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'На главную' })).not.toBeInTheDocument()
  })
})
