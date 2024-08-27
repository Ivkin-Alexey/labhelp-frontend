import { Stack } from "@mui/material"
import { IEquipmentItem } from "../models/equipments"
import { UserCard } from "./user-card/user-card"
import { IUserCard } from "../models/users"

interface IUserCardList {
  list?: IUserCard[]
}

export default function UserCardList({list}: IUserCardList) {

  if(!list) return null
  
     return (
      <Stack
      direction="row"
      spacing={4}
      useFlexGap
      flexWrap="wrap"
      justifyContent="center"
      marginBottom="40px"
    >{list.map(el => {
            const { login, password, fullName, imgUrl, equipments, position, department, isVerified } = el
  
            return (
              <UserCard
                key={login}
                login={login}
                fullName={fullName}
                imgUrl={imgUrl}
                isVerified={isVerified} 
                password={password} 
                position={position} 
                department={department}
                />
            )
          })}
        </Stack>
      )
}