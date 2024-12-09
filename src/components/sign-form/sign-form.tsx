import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { CircularProgress } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import SignUpLink from './sign-up-link'
import { categoryFilteringRules } from '../../app/inputs/filteringRules'
import forms from '../../app/inputs/forms'
import type { IFormValues } from '../../models/inputs'
import Form from '../form/form'

const defaultTheme = createTheme()

interface ISignForm {
  handleSubmit(data: IFormValues): void
  title: string
  isSignIn?: boolean
  isLoading: boolean
}

export default function SignForm(props: ISignForm) {
  const { title, handleSubmit, isSignIn, isLoading } = props

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ m: 1 }} />
        ) : (
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        )}
        <Typography component="h1" variant="h5" mb="10px">
          {title}
        </Typography>
        <Form
          inputList={isSignIn ? forms.signIn : forms.createUser}
          filteringRules={categoryFilteringRules}
          onSendData={handleSubmit}
          btnText={isSignIn ? 'Войти' : 'Зарегистрироваться'}
          optionalButtons={<Grid container>{isSignIn && <SignUpLink />}</Grid>}
        />
      </Box>
    </Container>
  )
}
