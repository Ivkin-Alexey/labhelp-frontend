import { createContext, useEffect, useMemo } from 'react'

import { Outlet, useLocation } from 'react-router-dom'

import { clearChunkReloadMark } from './error-page/error-page'
import Header from './header/header'
import { useAppSelector } from '../app/hooks/hooks'
import useTheme from '../app/hooks/useTheme'
import { useCheckTokenQuery } from '../store/api/users-api'
import { selectToken } from '../store/selectors'

export const ThemeContext = createContext({ color: 'white', toggle: () => {} })

export default function Root() {
  const [color, toggle] = useTheme()

  const memoized = useMemo(() => ({ color, toggle }), [color, toggle])

  const location = useLocation()

  const token = useAppSelector(selectToken)

  // Проверяем токен на сервере при старте приложения: если он протух,
  // эндпоинт сам очистит данные аккаунта (см. users-api -> checkToken)
  useCheckTokenQuery(undefined, { skip: !token })

  useEffect(() => {
    window.scrollTo(0, 0)
    // Приложение загрузилось успешно: сбрасываем метку авто-перезагрузки после
    // ошибки чанков, чтобы следующий такой сбой снова обработался автоматически
    clearChunkReloadMark()
  }, [location.pathname])

  return (
    <ThemeContext.Provider value={memoized}>
      <Header />
      <Outlet />
    </ThemeContext.Provider>
  )
}
