import personalData from "../app/inputs/personalData"
import { IAvailableEquipments } from "./equipments"
import { TInputValue } from "./inputs"

export type TLogin = string

export type TPersonRole = "admin" | "student" | "employee"

export interface IUserCredentials {
  login: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export interface IUserFormData {
  login: TLogin
  data: Partial<IUserForm>,
}

export interface IUserCard extends IUserForm {
  imgUrl?: string,
  equipments?: "all" | IAvailableEquipments
  isVerified: boolean
  role?: TPersonRole
}

export type TAccountData = IUserCard

type TUserFormSettings = {
  [key in keyof typeof personalData]: TInputValue;
};

export type IUserForm = {
  [key in keyof TUserFormSettings]: TInputValue
}





