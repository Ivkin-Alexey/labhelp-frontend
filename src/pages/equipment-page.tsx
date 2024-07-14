import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import { toLowerCaseFirstChart } from '../app/utils/utils'
import type { EquipmentID } from '../models/equipments'
import { useFetchEquipmentByIDQuery } from '../store/equipments-api'

export default function EquipmentPage() {
  const location = useLocation()

  const equipmentID = location.pathname.slice(1)

  const { isFetching, isError, data } = useFetchEquipmentByIDQuery(equipmentID)

  function handleBtnClick(e: React.MouseEvent, id: EquipmentID) {}

  if (isFetching) {
    return <CircularProgress size="60px" />
  }

  if (isError) {
    return <h3>Произошла ошибка</h3>
  }

  if (data) {
    const { id, brand, name, model, imgUrl, description } = data

    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40px',
        }}
      >
        <Box>
          <img
            height="400"
            src={imgUrl}
            alt="Изображение карточки"
            style={{ margin: 'auto', display: 'block', marginBottom: '10px' }}
          />
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Марка: {brand}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Модель: {model}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Описание: {toLowerCaseFirstChart(description)}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={e => handleBtnClick(e, id)}
            sx={{ marginTop: '10px' }}
          >
            В избранное
          </Button>
        </Box>
      </Container>
    )
  }
}
