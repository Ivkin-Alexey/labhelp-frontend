import { Button } from '@mui/material'

import type { Route } from '../../models/routes'

interface INavButtons {
  list: Route[]
  handleCloseNavMenu: (path: string) => void
}

export default function NavButtons(props: INavButtons) {
  const { list, handleCloseNavMenu } = props

  return list.map(page => (
    <Button
      key={page.title}
      href={page.path}
      onClick={e => {
        if (!page?.isRedirect) {
          e.preventDefault()
          handleCloseNavMenu(page.path)
        }
      }}
      sx={{
        color: 'textPrimary',
        display: 'block',
        textAlign: 'center',
        textJustify: 'center',
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
