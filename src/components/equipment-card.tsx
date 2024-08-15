import { useContext } from 'react'
import './components.css'

import { CardActionArea, CardActions, Chip } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import FavoriteButtons from './favorite-buttons'
import OperateButtons from './operating-buttons'
import { ThemeContext } from './root'
import type { EquipmentID } from '../models/equipments'

interface IEquipmentCard {
  id: EquipmentID
  title: string
  description: string
  imgUrl: string
  isFavorite?: boolean
  isOperate?: boolean
}

export function EquipmentCard(props: IEquipmentCard) {
  const { id, title, description, imgUrl, isFavorite, isOperate } = props

  const navigate = useNavigate()

  function handleClick(e: React.MouseEvent, id: EquipmentID) {
    navigate('/' + id)
  }

  const { color } = useContext(ThemeContext)

  return (
    <Card
      sx={{
        width: '10vw',
        minWidth: '200px',
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: color,
      }}
    >
      <CardActionArea
        onClick={e => handleClick(e, id)}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
        className="cardActionArea"
      >
        <div className='cardHeader'><Typography className="cardText" gutterBottom variant="body1" component="div">
            В работе
          </Typography></div>
        <div className="cardMediaWrapper">
          <CardMedia component="img" image={imgUrl} alt="Изображение карточки" />
        </div>
        <CardContent>
          <Typography className="cardText" gutterBottom variant="body1" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom="5px">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            № {id}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <OperateButtons equipmentID={id} isOperate={isOperate} />
        <FavoriteButtons equipmentID={id} isFavorite={isFavorite} />
      </CardActions>
    </Card>
  )
}

EquipmentCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  isOperate: PropTypes.bool,
}
