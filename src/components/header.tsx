import * as React from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useLocation, useNavigate } from 'react-router-dom'

const pages = [
  { title: 'Избранное', path: '/favourites' },
]
const settings = ['Выйти']

function Header() {
  const navigate = useNavigate()
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
    navigate('/')
  }

  React.useEffect(() => {
    console.log(location.pathname)
  }, [location])

  function renderLogo() {
    return (
      <Typography
        onClick={navigateToMainPage}
        variant="h6"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        LOGO
      </Typography>
    )
  }

  function renderBurgerMenu() {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map(page => (
            <MenuItem key={page.title} onClick={() => handleCloseNavMenu(page.path)}>
              <Typography textAlign="center">{page.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  }

  function renderNavButtonsBlock() {
    return (
      <>
        <Typography
          variant="h5"
          noWrap
          component="a"
          onClick={navigateToMainPage}
          sx={{
            mr: 2,
            display: { xs: {display: "flex", }, md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map(page => (
            <Button
              key={page.title}
              onClick={() => handleCloseNavMenu(page.path)}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                backgroundColor: page.path === location.pathname ? '#14589b' : 'inherit',
                '&:hover': {
                  backgroundColor: page.path === location.pathname ? '#14589b' : 'inherit',
               },
              }}
            >
              {page.title}
            </Button>
          ))}
        </Box>
      </>
    )
  }

  function renderUserMenu(): React.ReactElement {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Открыть настройки">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Имя пользователя" src="#" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map(setting => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {renderLogo()}
          {renderBurgerMenu()}
          {renderNavButtonsBlock()}
          {renderUserMenu()}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
