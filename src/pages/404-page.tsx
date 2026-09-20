import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { routes } from '../app/constants/constants'
import notFoundImage from '../images/404.svg'

export default function NotExistPage() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <Box
        component="img"
        src={notFoundImage}
        alt="Страница не найдена"
        sx={{
          width: { xs: '220px', sm: '320px' },
          maxWidth: '100%',
          objectFit: 'contain',
        }}
      />
      <Typography variant="h5" component="div">
        Страница не найдена
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        Возможно, она была удалена или ещё находится в разработке
      </Typography>
      <Button variant="contained" component={Link} to={routes.main}>
        На главную
      </Button>
    </Container>
  )
}
