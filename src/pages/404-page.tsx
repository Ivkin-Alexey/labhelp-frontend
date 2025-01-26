import { Container, Typography } from '@mui/material'

export default function NotExistPage() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Страница не найдена или находится в разработке
      </Typography>
    </Container>
  )
}
