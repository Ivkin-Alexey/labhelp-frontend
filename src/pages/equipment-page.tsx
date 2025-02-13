import { useContext } from 'react'

import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../app/hooks/hooks'
import { toLowerCaseFirstChart } from '../app/utils/utils'
import Circular from '../components/circular'
import FavoriteButtons from '../components/equipment-card/favorite-buttons'
import OperateStatus from '../components/equipment-card/operate-status'
import { ThemeContext } from '../components/root'
import { useFetchEquipmentByIDQuery } from '../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS, selectLogin } from '../store/selectors'
import { KingBedSharp } from '@mui/icons-material'

export default function EquipmentPage() {
  const location = useLocation()

  const equipmentId = location.pathname.slice(1)
  const accountLogin = useAppSelector(selectLogin)
  const favoriteIds = useAppSelector(selectFavoriteEquipmentsFromLS)

  const { color } = useContext(ThemeContext)

  const { isFetching, isLoading, isError, data } = useFetchEquipmentByIDQuery({
    equipmentId,
    login: accountLogin,
  })

  if (isLoading || isLoading) {
    return <Circular />
  }

  if (isError) {
    return <h3>Произошла ошибка</h3>
  }

  console.log(data)

  if (data) {
    let {
      id,
      brand,
      name,
      model,
      imgUrl,
      description,
      department,
      measurements,
      classification,
      type,
      kind,
      sameList,
      // isFavorite,
      isOperate,
      userName,
      login,
      userId,
    } = data

    const isFavorite = favoriteIds.includes(id)

    let label

    if (accountLogin === login || accountLogin === userId) {
      label = 'Вы используете'
    } else if (userId) {
      label = 'В работе у пользователя ' + userId
    }

    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: color,
        }}
      >
        <Box sx={{ position: 'relative', marginBottom: "40px" }}>
        <Box sx={{ padding: "0 8px" }}>
          <OperateStatus isOperate={isOperate} label={label} />
          <img
            height="400"
            src={imgUrl}
            alt="Изображение карточки"
            style={{ margin: 'auto', display: 'block', marginBottom: '10px' }}
          />
          <Typography gutterBottom variant="h5" component="div">
            {name + " " + model}
          </Typography>
          {/* <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Марка: {brand}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            Модель: {model}
          </Typography> */}
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
            {description}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
          <b>Наименование подразделения:</b> {department}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
          <b>Тип оборудования:</b> {toLowerCaseFirstChart(type)}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
          <b>Вид измерений:</b> {toLowerCaseFirstChart(measurements)}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
          <b>Вид оборудования:</b> {toLowerCaseFirstChart(kind)}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginBottom="10px">
          <b>Классификация оборудования:</b> {toLowerCaseFirstChart(classification)}
          </Typography>
          {sameList && <Typography variant="body1" color="text.secondary" marginBottom="10px">
          <b>Количество:</b> {sameList.length + 1}
          </Typography>}
          </Box>
          <FavoriteButtons equipmentId={id} isFavorite={isFavorite} isCardMode={false} />
        </Box>
      </Container>
    )
  }
}
