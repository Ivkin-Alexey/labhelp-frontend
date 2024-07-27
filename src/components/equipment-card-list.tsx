import { CircularProgress, Stack, Typography } from '@mui/material'

import { EquipmentCard } from './equipment-card'
import type { EquipmentItem } from '../models/equipments'

interface ICardList {
  isLoading: boolean
  isError: boolean
  list: EquipmentItem[] | undefined
}

export default function CardList(props: ICardList) {

  const { isError, isLoading, list } = props

  if (isLoading) {
    return <CircularProgress size="60px" />
  }

  if (isError) {
    return (
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Произошла ошибка
      </Typography>
    )
  }

  if (list?.length === 0) {
    return (
      <Typography gutterBottom variant="body1" component="div" marginTop="40px">
        Оборудование не найдено
      </Typography>
    )
  }

  if (Array.isArray(list)) {
    return (
      <Stack
        direction="row"
        spacing={4}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        marginBottom="40px"
      >
        {list.map(el => {
          const { id, imgUrl, name, model, isFavorite } = el

          return (
            <EquipmentCard
              key={id}
              id={id}
              title={name}
              description={model}
              imgUrl={imgUrl}
              isFavorite={isFavorite}
            />
          )
        })}
      </Stack>
    )
  }
}
