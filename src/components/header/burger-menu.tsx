import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'

import type { Route } from '../../models/routes'

interface IBurgerMenu {
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseNavMenu: (path: string) => void
  anchorElNav: null | HTMLElement
  list: Route[]
}

export default function BurgerMenu(props: IBurgerMenu) {
  const { handleOpenNavMenu, anchorElNav, handleCloseNavMenu, list } = props

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
        {list.map(page => (
          <MenuItem key={page.title} onClick={() => handleCloseNavMenu(page.path)}>
            <Typography textAlign="center">{page.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
