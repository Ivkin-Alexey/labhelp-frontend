import { AvailableEquipments } from "./equipments"

export type TUserID = string

export interface IUserCredentials {
  login: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export interface IUserCard {
  imgUrl?: string,
  login: string,
  password: string, 
  fullName: string, 
  position: string, 
  department: string, 
  equipments?: "all" | AvailableEquipments
  isVerified: boolean
}
