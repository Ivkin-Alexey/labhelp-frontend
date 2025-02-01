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
        width: '10vw',
        minWidth: '200px',
        marginTop: '40px',
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
          <CardMedia component="img" image={imgUrl} alt="Изображение карточки" />
        </div>
        <CardContent>
          <Typography className="cardText" gutterBottom variant="body1" component="div">
            {name}
          </Typography>
          {!isCardMode && (
            <Typography variant="body2" color="text.secondary" marginBottom="5px">
              {description}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Инвентарный № {inventoryNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Заводской № {serialNumber}
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
