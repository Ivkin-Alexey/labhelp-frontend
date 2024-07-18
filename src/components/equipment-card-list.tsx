import { CircularProgress, Stack } from '@mui/material'

import { EquipmentCard } from './equipment-card'
import type { EquipmentID, EquipmentItem } from '../models/equipments'

interface ICardList {
  isLoading: boolean
  isError: boolean
  list: EquipmentItem[] | undefined
}

export default function CardList(props: ICardList) {
  function handleBtnClick(e: React.MouseEvent, id: EquipmentID) {} //TODO: implement storage data in the favorites

  const { isError, isLoading, list } = props

  if (isLoading) {
    return <CircularProgress size="60px" />
  }

  if (isError) {
    return <h3>Произошла ошибка</h3>
  }

  if (!list) {
    return <h3>Данные отсутствуют</h3>
  }

  if (Array.isArray(list)) {
    return (
      <Stack direction="row" spacing={4} useFlexGap flexWrap="wrap" justifyContent="center">
        {list.map(el => {
          const { id, imgUrl, name, model } = el

          return (
            <EquipmentCard
              key={id}
              id={id}
              title={name}
              description={model}
              imgUrl={imgUrl}
              handleBtnClick={handleBtnClick}
            />
          )
        })}
      </Stack>
    )
  }
}
