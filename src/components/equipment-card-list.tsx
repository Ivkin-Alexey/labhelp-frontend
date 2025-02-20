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
      useFlexGap
      flexWrap="wrap"
      justifyContent="center"
      sx={{marginBottom: {xs: "10px", md: "40px"}, gap: {xs: "3vw", md: "30px"}}}
    >
      {list.map((el, i) => {
        return <EquipmentCard key={i} {...el} isCardMode={true} />
      })}
    </Stack>
  )
}
