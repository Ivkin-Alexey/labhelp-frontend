import { Stack } from '@mui/material'

import { EquipmentCard } from './equipment-card/equipment-card'
import type { IEquipmentItem } from '../models/equipments'

interface IEquipmentCardList {
  list?: IEquipmentItem[]
}

export default function EquipmentCardList({ list }: IEquipmentCardList) {
  if (!list) {
    return null
  }

  return (
    <Stack
      direction="row"
      spacing={4}
      useFlexGap
      flexWrap="wrap"
      justifyContent="center"
      marginBottom="40px"
    >
      {list.map((el,i) => {
        return <EquipmentCard key={i} {...el} isCardMode={true} />
      })}
    </Stack>
  )
}
