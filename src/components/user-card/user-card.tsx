import { useContext } from 'react'
import './user-card.css'

import { CardActionArea, CardActions} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import FavoriteButtons from './favorite-buttons'
import CardStatus from './card-status'
import OperateButtons from './operating-buttons'
import type { TUserID, IUserCard } from '../../models/users'

export function UserCard(props: IUserCard) {
  const { imgUrl = "#", login: userID, password, fullName, position, department, isVerified } = props

  const navigate = useNavigate()

  function handleClick(e: React.MouseEvent, userID: TUserID) {
    navigate('/user/' + userID)
  }

  return (
    <Card
      sx={{
        width: '12vw',
        minWidth: '200px',
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
      }}
    >
      <CardActionArea
        onClick={e => handleClick(e, userID)}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
        className="cardActionArea"
      >
        <CardStatus isVisible={!isVerified} text="Не подтвержден" color="error"/>
        <div className="cardMediaWrapper">
          <CardMedia component="img" image={imgUrl || "../"} alt="Изображение карточки" />
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
           логин: {userID}
          </Typography>
          <Typography variant="body2" color="text.primary" marginBottom="5px">
           пароль: {password}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', padding: "16px",  }}> */}
        {/* <OperateButtons equipmentID={id} isOperate={isOperate} userID={userID} />
        <FavoriteButtons equipmentID={id} isFavorite={isFavorite} isCardMode={isCardMode} /> */}
      {/* </CardActions> */}
    </Card>
  )
}
