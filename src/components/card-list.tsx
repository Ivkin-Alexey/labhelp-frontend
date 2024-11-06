import type React from 'react'

import { CircularProgress, Typography } from '@mui/material'

import type { IEquipmentItem } from '../models/equipments'
import type { IUserCard } from '../models/users'

interface ICardList {
  isLoading: boolean
  isError: boolean
  Component: React.ElementType
  list?: IEquipmentItem[] | IUserCard[]
}

export default function CardList(props: ICardList) {
  const { isError, isLoading, list, Component } = props

  if (isLoading || !Component) {
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
    return <Component list={list}/>
  }
}
