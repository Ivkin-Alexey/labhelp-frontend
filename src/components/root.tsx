import { createContext, useEffect, useMemo, useState } from 'react'

import { Outlet } from 'react-router-dom'

import Circular from './circular'
import Header from './header/header'
import useTheme from '../app/hooks/useTheme'

export const ThemeContext = createContext({ color: 'white', toggle: () => {} })

export default function Root() {
  const [color, toggle] = useTheme()

  const memoized = useMemo(() => ({ color, toggle }), [color, toggle])

  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   window.onload = () => {
  //     setIsLoading(false)
  //   }

  //   return () => {
  //     window.onload = null
  //   }
  // }, [])

  // function renderContent() {
  //   if (isLoading) {
  //     return <Circular />
  //   }

  //   return 
  // }

  return (
    <ThemeContext.Provider value={memoized}>
      {/* <Header /> */ <Outlet />}
    </ThemeContext.Provider>
  )
}
