import { createContext, useState } from 'react'

import { Outlet } from 'react-router-dom'

import Header from './header/header'

export const ThemeContext = createContext({ color: 'white', toggle: () => {} })

export default function Root() {
  const [color, setColor] = useState('white')

  function toggle() {
    if (color === 'white') {
      setColor('#002884')
    } else {
      setColor('white')
    }
  }

  return (
    <ThemeContext.Provider value={{ color, toggle }}>
      <Header />
      <Outlet />
    </ThemeContext.Provider>
  )
}
