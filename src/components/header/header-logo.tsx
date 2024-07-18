import { Typography } from '@mui/material'

interface IHeaderLogo {
  navigateToMainPage: () => void
}

export default function HeaderLogo(props: IHeaderLogo) {
  const { navigateToMainPage } = props

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
