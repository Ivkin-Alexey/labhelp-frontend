import { Typography, Box, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

import type { Route } from '../../models/routes'

interface IHeaderNavigation {
  handleCloseNavMenu: (path: string) => void
  navigateToMainPage: () => void,
  list: Route[]
}

export default function HeaderNavigation(props: IHeaderNavigation) {
  const { handleCloseNavMenu, navigateToMainPage, list } = props
  const location = useLocation()

  return (
    <>
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={navigateToMainPage}
        sx={{
          mr: 2,
          display: { xs: { display: 'flex' }, md: 'none' },
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
        {list.map(page => (
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
