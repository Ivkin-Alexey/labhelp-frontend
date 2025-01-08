import type React from 'react'

import { Typography } from '@mui/material'

import Circular from './circular'
import type { IEquipmentItem } from '../models/equipments'
import type { IUserCard } from '../models/users'

interface ICardList {
  isLoading: boolean
  isError: boolean
  Component?: React.ElementType
  list?: IEquipmentItem[] | IUserCard[]
}

export default function CardList(props: ICardList) {
  const { isError, isLoading, list, Component } = props

  if (isLoading || !Component) {
    return <Circular/>
  }

  if (isError) {
    return (
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Произошла ошибка
      </Typography>
    )
  }

  if (list && list?.length === 0) {
    return (
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Список пуст
      </Typography>
    )
  }

  if (Array.isArray(list)) {
    return <Component list={list} />
  }
}
