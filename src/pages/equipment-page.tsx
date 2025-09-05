import { useContext } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { KingBedSharp } from '@mui/icons-material'
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppSelector } from '../app/hooks/hooks'
import { toLowerCaseFirstChart } from '../app/utils/utils'
import Circular from '../components/circular'
import FavoriteButtons from '../components/equipment-card/favorite-buttons'
import OperateStatus from '../components/equipment-card/operate-status'
import { ThemeContext } from '../components/root'
import { useFetchEquipmentByIDQuery } from '../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS, selectLogin } from '../store/selectors'

export default function EquipmentPage() {
  const navigate = useNavigate(); // Хук для навигации
  const location = useLocation();

  const equipmentId = location.pathname.slice(1);
  const accountLogin = useAppSelector(selectLogin);
  const favoriteIds = useAppSelector(selectFavoriteEquipmentsFromLS);

  const { color } = useContext(ThemeContext);

  const { isFetching, isLoading, isError, data } = useFetchEquipmentByIDQuery({
    equipmentId,
    login: accountLogin,
  });

  if (isLoading || isLoading) {
    return <Circular />;
  }

  if (isError) {
    return <h3>Произошла ошибка</h3>;
  }

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
      isOperate,
      userName,
      login,
      userId,
    } = data;

    const isFavorite = favoriteIds.includes(id);

    let label;

    if (accountLogin === login || accountLogin === userId) {
      label = 'Вы используете';
    } else if (userId) {
      label = 'В работе у пользователя ' + userId;
    }

    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: color,
          overflowX: 'hidden',
          marginBottom: "20px",
          padding: 0,
        }}
      >
        <Button
          variant="text"
          onClick={() => navigate(-1)}
          sx={{ alignSelf: 'flex-start', margin: '10px', display: {sm: "inline-flex", md: "none"}}}
        >
                      <ArrowBackIosIcon />
              Назад
        </Button>
        <Box sx={{ position: 'relative', marginBottom: '40px', margin: '0 0', padding: "8px", width: {sm: "80%", md: "100%"}}}>
          <OperateStatus isOperate={isOperate} label={label} />
          <img
            src={imgUrl}
            alt="Изображение карточки"
            style={{
              margin: 'auto',
              display: 'block',
              marginBottom: '10px',
              maxWidth: '100%',
              maxHeight: "35vh"
            }}
          />
          <Typography gutterBottom variant="h5" component="div">
            {name + ' ' + model}
          </Typography>
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
          {sameList && (
            <Typography variant="body1" color="text.secondary" marginBottom="10px">
              <b>Количество:</b> {sameList.length + 1}
            </Typography>
          )}
        </Box>
        <FavoriteButtons equipmentId={id} isFavorite={isFavorite} isCardMode={false} />
      </Container>
    );
  }
}
