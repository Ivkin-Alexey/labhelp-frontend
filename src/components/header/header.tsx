import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useLocation, useNavigate } from 'react-router-dom'

import BurgerMenu from './burger-menu'
import HeaderLogo from './header-logo'
import HeaderNavigation from './header-navigation'
import UserMenu from './user-menu'
import { routes } from '../../app/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import { selectAccount } from '../../store/selectors'

const pages = [
  { title: 'Избранное', path: routes.favorites },
  { title: 'История', path: routes.history },
]

const settings = [
  { title: 'Войти', path: routes.signIn },
  { title: 'Зарегистрироваться', path: routes.signUp },
  { title: 'Выйти', path: routes.main },
]

function Header() {
  const navigate = useNavigate()
  const { isAuth } = useAppSelector(selectAccount)

  const location = useLocation()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (path: string) => {
    setAnchorElNav(null)
    navigate(path)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  function navigateToMainPage() {
    navigate(routes.main)
  }

  function getUserMenuList() {
    if (isAuth) {
      return [settings[2]]
    }
    const path = location.pathname
    if (path === routes.signIn) {
      return [settings[1]]
    }
    if (path === routes.signUp) {
      return [settings[0]]
    }
    return settings.slice(0, 2)
  }

  return (
    <AppBar position="static" sx={{ marginBottom: '40px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderLogo navigateToMainPage={navigateToMainPage} />
          {isAuth && (
            <BurgerMenu
              handleOpenNavMenu={handleOpenNavMenu}
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              list={pages}
            />
          )}
          <HeaderNavigation
            list={pages}
            isAuth={isAuth}
            handleCloseNavMenu={handleCloseNavMenu}
            navigateToMainPage={navigateToMainPage}
          />
          <UserMenu
            handleOpenUserMenu={handleOpenUserMenu}
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
            list={getUserMenuList()}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
