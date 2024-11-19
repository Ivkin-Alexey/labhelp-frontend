import { Stack } from "@mui/material"

import { UserCard } from "./user-card/user-card"
import { IEquipmentItem } from "../models/equipments"
import type { IUserCard } from "../models/users"

interface IUserCardList {
  list?: IUserCard[]
}

export default function UserCardList({list}: IUserCardList) {

  if(!list) {return null}
  
     return (
      <Stack
      direction="row"
      spacing={4}
      useFlexGap
      flexWrap="wrap"
      justifyContent="center"
      marginBottom="40px"
    >{list.map(el => {
            const { login, ...props } = el
  
            return (
              <UserCard
                key={login}
                login={login}
                {...props}
                />
            )
          })}
        </Stack>
      )
}