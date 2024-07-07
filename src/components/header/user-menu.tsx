import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material'

import type { Route } from '../../models/routes'

interface IUserMenu {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
  anchorElUser: null | HTMLElement
  list: Route[]
}

export default function UserMenu(props: IUserMenu): React.ReactElement {
  const { handleOpenUserMenu, anchorElUser, handleCloseUserMenu, list } = props

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
        {list.map(setting => (
          <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
