import type * as React from 'react'
import { useEffect, useMemo, useState } from 'react'

import { Theme, Typography, useMediaQuery } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import { useLocation, useNavigate } from 'react-router-dom'

import BurgerMenu from './burger-menu'
import HeaderLogo from './header-logo'
import HeaderNavigation from './header-navigation'
import Logo from './logo'
import UserMenu from './user-menu'
import { routes } from '../../app/constants/constants'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { selectAccount, selectIsAuth } from '../../store/selectors'

import './style.css'
import { clearEquipmentSearch } from '../../store/equipments-slice'
import theme from '../../theme'

// let defaultPages = [
//   { title: 'Избранное', path: routes.favorites },
//   { title: 'История поиска', path: routes.history },
//   { title: 'Оборудование в работе', path: routes.operatingEquipments },
// ]

// const adminPages = [{ title: 'Администрирование', path: routes.admin }]

const settings = [
  { title: 'Войти', path: routes.signIn },
  { title: 'Зарегистрироваться', path: routes.signUp },
  { title: 'Выйти', path: routes.main },
]

function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  const location = useLocation()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { accountData } = useAppSelector(selectAccount)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  // const pages = useMemo(() => {
  //   if (accountData?.role === 'admin') {
  //     return [...defaultPages, ...adminPages]
  //   } else {
  //     return defaultPages
  //   }
  // }, [accountData])

  const pages = [
    { title: 'Главная', path: routes.main },
    { title: 'Санкт-Петербургский горный университет', path: 'https://spmi.ru/', isRedirect: true },
    { title: 'Учебные лаборатории', path: 'https://studlab.spmi.ru/', isRedirect: true },
    {
      title: 'Научные центры и проблемные лаборатории',
      path: 'https://nauka.spmi.ru/',
      isRedirect: true,
    },
    { title: 'Контакты', path: routes[404] },
    { title: 'Избранное оборудование', path: routes.favorites },
  ]

  if(!isMobile) {
    pages.shift()
  }

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
    dispatch(clearEquipmentSearch())
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
    <AppBar position="static" sx={{ boxShadow: 'none', backgroundColor: 'white' }}>
      <Container maxWidth="xl" sx={{ pt: '10px' }}>
        <Logo />
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          sx={{ cursor: 'pointer', marginTop: {xs: 0, md: "10px"}}} onClick={navigateToMainPage}
        >
          Единый каталог учебного и научного лабораторного оборудования
        </Typography>
        <Toolbar disableGutters sx={{
    position: { xs: 'absolute', sm: 'static' },
    top: { xs: '10px', sm: '0' },
  }}>
          {/* <HeaderLogo navigateToMainPage={navigateToMainPage} /> */}
          {/* {isAuth && (
            <BurgerMenu
              handleOpenNavMenu={handleOpenNavMenu}
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              list={pages}
            />
          )} */}
          <BurgerMenu
            handleOpenNavMenu={handleOpenNavMenu}
            anchorElNav={anchorElNav}
            handleCloseNavMenu={handleCloseNavMenu}
            list={pages}
          />
          <HeaderNavigation
            list={pages}
            isAuth={isAuth}
            handleCloseNavMenu={handleCloseNavMenu}
            navigateToMainPage={navigateToMainPage}
          />
          {/* <FormControlLabel
            control={<Switch color="default" checked={color !== 'white'} onChange={toggle} />}
            label="Сменить тему"
          /> */}
          {/* <UserMenu
            handleOpenUserMenu={handleOpenUserMenu}
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
            list={getUserMenuList()}
          /> */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
