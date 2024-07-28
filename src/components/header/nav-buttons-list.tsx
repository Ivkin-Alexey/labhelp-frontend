import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

import type { Route } from '../../models/routes'

interface INavButtons {
  list: Route[]
  handleCloseNavMenu: (path: string) => void
}

export default function NavButtons(props: INavButtons) {
  const { list, handleCloseNavMenu } = props

  const location = useLocation()

  return list.map(page => (
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
  ))
}
