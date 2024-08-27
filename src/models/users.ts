import { AvailableEquipments } from "./equipments"

export interface UserCredentials {
  login: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export interface UserCard {
  imgUrl: null | string,
  login: string,
  password: string, 
  fullName: string, 
  position: string, 
  department: string, 
  equipments: "all" | AvailableEquipments
}
