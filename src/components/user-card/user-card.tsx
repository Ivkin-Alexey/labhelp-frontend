import { useContext } from 'react'
import './user-card.css'

import { CardActionArea, CardActions } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import CardStatus from './card-status'
import FavoriteButtons from './favorite-buttons'
import OperateButtons from './operating-buttons'
import { routes } from '../../app/constants/constants'
import { createPersonName } from '../../app/methods/methods'
import type { TLogin, IUserCard } from '../../models/users'

export function UserCard(props: IUserCard) {
  const { imgUrl = '#', login, password, position, department, isVerified } = props

  const navigate = useNavigate()

  function handleClick(e: React.MouseEvent, login: TLogin) {
    navigate(routes.admin + '/' + login)
  }

  const fullName = createPersonName(props)

  return (
    <Card
      sx={{
        width: '12vw',
        minWidth: '230px',
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <CardActionArea
        onClick={e => handleClick(e, login)}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
        className="cardActionArea"
      >
        <CardStatus isVisible={!isVerified} text="Не подтвержден" color="error" />
        <div className="cardMediaWrapper">
          <CardMedia component="img" image={imgUrl || '../'} alt="Изображение карточки" />
        </div>
        <CardContent>
          <Typography className="cardText" gutterBottom variant="body1" component="div">
            {fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom="5px">
            {position}
          </Typography>
          <Typography variant="body2" color="text.secondary" marginBottom="5px">
            {department}
          </Typography>
          <Typography variant="body2" color="text.primary" marginBottom="5px">
            логин: {login}
          </Typography>
          <Typography variant="body2" color="text.primary" marginBottom="5px">
            пароль: {password}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', padding: "16px",  }}> */}
      {/* <OperateButtons equipmentId={id} isOperate={isOperate} login={login} />
        <FavoriteButtons equipmentId={id} isFavorite={isFavorite} isCardMode={isCardMode} /> */}
      {/* </CardActions> */}
    </Card>
  )
}
