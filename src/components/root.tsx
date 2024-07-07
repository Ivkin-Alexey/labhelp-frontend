import { Outlet } from 'react-router-dom'

import Header from './header/header'

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
