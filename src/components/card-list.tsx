import { CircularProgress, Typography } from '@mui/material'
import PropTypes from 'prop-types'

import type { EquipmentItem } from '../models/equipments'
import EquipmentCardList from './equipment-card-list'

interface ICardList {
  isLoading: boolean
  isError: boolean
  list?: EquipmentItem[] | UserCard[]
}

export default function CardList(props: ICardList) {
  const { isError, isLoading, list } = props

  if (isLoading) {
    return <CircularProgress size="60px" />
  }

  if (isError || !list) {
    return (
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Произошла ошибка
      </Typography>
    )
  }

  if (list && list?.length === 0) {
    return (
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Оборудование не найдено
      </Typography>
    )
  }

  if (Array.isArray(list)) {
    return <EquipmentCardList list={list}/>
  }
}

CardList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool,
    }),
  ),
}
