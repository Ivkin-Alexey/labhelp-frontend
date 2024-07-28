import { createContext, useMemo} from 'react'

import { Outlet } from 'react-router-dom'

import Header from './header/header'
import useTheme from '../app/hooks/useTheme'

export const ThemeContext = createContext({ color: 'white', toggle: () => {} })

export default function Root() {
  const [color, toggle] = useTheme()

  const memoized = useMemo(() => ({ color, toggle }), [color, toggle])

  return (
    <ThemeContext.Provider value={memoized}>
      <Header />
      <Outlet />
    </ThemeContext.Provider>
  )
}
