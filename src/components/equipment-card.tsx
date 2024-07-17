import { Button, CardActionArea, CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import type { EquipmentID } from '../models/equipments'

interface IEquipmentCard {
  id: EquipmentID
  title: string
  description: string
  imgUrl: string
  handleBtnClick: (e: React.MouseEvent, id: EquipmentID) => void
}

export function EquipmentCard(props: IEquipmentCard) {
  const { id, title, description, imgUrl, handleBtnClick } = props

  const navigate = useNavigate()

  function handleClick(e: React.MouseEvent, id: EquipmentID) {
    navigate('/' + id)
  }

  return (
    <Card sx={{ maxWidth: '200px', marginTop: '40px' }}>
      <CardActionArea onClick={e => handleClick(e, id)}>
        <CardMedia component="img" height="140" image={imgUrl} alt="Изображение карточки" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={e => handleBtnClick(e, id)}>
          В избранное
        </Button>
      </CardActions>
    </Card>
  )
}
