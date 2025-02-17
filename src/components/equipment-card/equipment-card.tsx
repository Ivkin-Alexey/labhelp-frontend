import './equipment-card.css'

import { CardActionArea, CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import FavoriteButtons from './favorite-buttons'
import OperateButtons from './operating-buttons'
import type { equipmentId, TEquipmentCard } from '../../models/equipments'
import CardStatus from '../user-card/card-status'

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
  } = props

  const navigate = useNavigate()

  function handleClick(e: React.MouseEvent, id: equipmentId) {
    navigate('/' + encodeURIComponent(id))
  }

  return (
    <Card
      sx={{
        width: {xs: "40vw", md: "15vw"},
        minWidth: {xs: "120px", md: "250px"},
        marginTop: {xs: "15px", md: "40px'"},
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <CardActionArea
        onClick={e => handleClick(e, id)}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
        className="cardActionArea"
      >
        <CardStatus isVisible={isOperate} text={userName || 'В работе'} />
        <div className="cardMediaWrapper">
          <CardMedia component="img" image={imgUrl} alt="Изображение карточки" sx={{alignContent: "center"}}/>
        </div>
        <CardContent>
          <Typography className="cardText" gutterBottom variant="body1" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom="5px" sx={{display: {xs: "none", md: "block"}}}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        {/* <OperateButtons equipmentId={id} isOperate={isOperate} login={login} /> */}
        <FavoriteButtons equipmentId={id} isFavorite={isFavorite} isCardMode={isCardMode} />
      </CardActions>
    </Card>
  )
}
