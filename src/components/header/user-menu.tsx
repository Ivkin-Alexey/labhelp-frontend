import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../app/constants/constants'
import { useAppDispatch } from '../../app/hooks/hooks'
import type { Route } from '../../models/routes'
import { clearUserData } from '../../store/users-slice'

interface IUserMenu {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
  anchorElUser: null | HTMLElement
  list: Route[]
}

export default function UserMenu(props: IUserMenu): React.ReactElement {
  const { handleOpenUserMenu, anchorElUser, handleCloseUserMenu, list } = props

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  function handleClick(path: string): void {
    if (path === routes.main) {
      dispatch(clearUserData())
    }
    navigate(path)
  }

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
          <MenuItem key={setting.title} onClick={() => handleClick(setting.path)}>
            <Typography textAlign="center">{setting.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
