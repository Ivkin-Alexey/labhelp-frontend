import personalData from "../app/inputs/personalData"
import { IAvailableEquipments } from "./equipments"
import { TInputValue } from "./inputs"

export type TUserID = string

export interface IUserCredentials {
  login: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

type TUserFormSettings = {
  [key in keyof typeof personalData]: TInputValue;
};

export type IUserForm = {
  [key in keyof TUserFormSettings]: TInputValue
}

export interface IUserCard extends IUserForm {
  imgUrl?: string,
  equipments?: "all" | IAvailableEquipments
  isVerified: boolean
}



