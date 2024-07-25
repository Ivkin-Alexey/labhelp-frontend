import { Grid, Link } from '@mui/material'

import { routes } from '../../app/constants'

export default function SignUpLink() {
  return (
    <Grid item>
      <Link href={routes.signUp} variant="body2">
        {'Нет аккаунта? Зарегистрироваться'}
      </Link>
    </Grid>
  )
}
