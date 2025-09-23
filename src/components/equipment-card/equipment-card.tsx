import './equipment-card.css'

import { Box, CardActionArea, CardActions, Theme, useMediaQuery } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import FavoriteButtons from './favorite-buttons'
import OperateButtons from './operating-buttons'
import type { equipmentId, TEquipmentCard } from '../../models/equipments'
import CardStatus from '../user-card/card-status'
import { Height, Padding } from '@mui/icons-material'

export function EquipmentCard(props: TEquipmentCard) {
  const {
    id,
    name,
    inventoryNumber,
    serialNumber,
    description,
    imgUrl,
    isFavorite = false,
    isOperate = false,
    login,
    isCardMode,
    userName,
    quantity,
  } = props

  const navigate = useNavigate()

  function handleClick(e: React.MouseEvent, id: equipmentId) {
    navigate('/' + encodeURIComponent(id))
  }

  return (
    <Card className="card" sx={{
      width: {xs: "42vw", md: "15vw"},
      minWidth: {xs: "120px", md: "250px"},
      marginTop: {xs: "5px", md: "20px"},
    }}
      
    >
      <CardActionArea
        onClick={e => handleClick(e, id)}
        className="cardActionArea"
      >
        <CardStatus isVisible={isOperate} text={userName || 'В работе'} />
        <Box className="cardMediaWrapper">
          <CardMedia component="img" image={imgUrl} alt="Изображение карточки" />
        </Box>
        <CardContent sx={{padding: {xs: "8px", sm: "16px"}}}>
          <Typography className="cardText" gutterBottom variant="body1" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom="5px" sx={{display: {xs: "none", sm: "block"}}}>
            {description}
          </Typography>
          {quantity && (
            <Typography variant="inherit" color="text.secondary" marginBottom="5px">
              Количество: {quantity}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ padding: {xs: "8px", sm: "16px"}}} className='cardActions'>
        {/* <OperateButtons equipmentId={id} isOperate={isOperate} login={login} /> */}
        <FavoriteButtons equipmentId={id} isFavorite={isFavorite} isCardMode={isCardMode} />
      </CardActions>
    </Card>
  )
}
