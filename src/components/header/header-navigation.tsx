import React, { Suspense, useMemo } from 'react'

import { Typography, Box } from '@mui/material'

import type { Route } from '../../models/routes'
import Fallback from '../Fallback'

interface IHeaderNavigation {
  handleCloseNavMenu: (path: string) => void
  navigateToMainPage: () => void
  list: Route[]
  isAuth: boolean
}

export default function HeaderNavigation(props: IHeaderNavigation) {
  const { handleCloseNavMenu, navigateToMainPage, list, isAuth } = props

  const NavButtons = useMemo(() => React.lazy(() => import('./nav-buttons-list')), [isAuth])

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
        <Suspense fallback={null}>
          {isAuth && <NavButtons list={list} handleCloseNavMenu={handleCloseNavMenu} />}
        </Suspense>
      </Box>
    </>
  )
}
