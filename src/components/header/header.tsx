import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'

import BurgerMenu from './burger-menu'
import HeaderLogo from './header-logo'
import HeaderNavigation from './header-navigation'
import UserMenu from './user-menu'

const pages = [{ title: 'Избранное', path: '/favourites' }]
const settings = [{ title: 'Войти', path: '/sigin' }, {title: 'Зарегистрироваться', path: '/sigup'}, {title: 'Выйти', path: '/'}, ]

function Header() {
  const navigate = useNavigate()

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
    navigate('/')
  }

  return (
    <AppBar position="static" sx={{marginBottom: "40px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HeaderLogo navigateToMainPage={navigateToMainPage} />
          <BurgerMenu
            handleOpenNavMenu={handleOpenNavMenu}
            anchorElNav={anchorElNav}
            handleCloseNavMenu={handleCloseNavMenu}
            list={pages}
          />
          <HeaderNavigation list={pages} handleCloseNavMenu={handleCloseNavMenu} navigateToMainPage={navigateToMainPage}/>
          <UserMenu
            handleOpenUserMenu={handleOpenUserMenu}
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
            list={settings}
          />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
