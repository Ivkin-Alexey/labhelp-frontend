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
      href={page.path}
      
      onClick={() => {
        if (!page?.isRedirect) {
          handleCloseNavMenu(page.path)
        }

      }}
      sx={{
        color: 'textPrimary',
        display: 'block',
        textAlign: "center",
        textJustify: "center",
        // backgroundColor: page.path === location.pathname ? '#14589b' : 'inherit',
        // '&:hover': {
        //   backgroundColor: page.path === location.pathname ? '#14589b' : 'inherit',
        // },
      }}
    >
      {page.title}
    </Button>
  ))
}
