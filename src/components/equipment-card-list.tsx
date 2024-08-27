import { Stack } from "@mui/material"
import { EquipmentItem } from "../models/equipments"
import { EquipmentCard } from "./equipment-card/equipment-card"

interface IEquipmentCardList {
  list?: EquipmentItem[]
}

export default function EquipmentCardList({list}: IEquipmentCardList) {

  if(!list) return null
  
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
            const { id, imgUrl, name, model, isFavorite, isOperate, userID, userName } = el
  
            return (
              <EquipmentCard
                key={id}
                id={id}
                userID={userID}
                title={name}
                description={model}
                imgUrl={imgUrl}
                isFavorite={isFavorite}
                isOperate={isOperate}
                isCardMode={true}
                userName={userName}
              />
            )
          })}
        </Stack>
      )
}