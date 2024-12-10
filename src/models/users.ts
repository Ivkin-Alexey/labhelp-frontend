import type { IAvailableEquipments } from './equipments'
import type { TInputValue } from './inputs'
import type personalData from '../app/inputs/personalData'

export type TLogin = string

export type TPersonRole = 'admin' | 'student' | 'employee'

export interface IAccountState {
  isAuth: boolean
  accountData: TAccountData | null
  token: string | null
}

export interface IUserCredentials {
  login: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export interface IUserRegistrationData extends IUserCredentials {
  data?: Partial<IUserForm>
}

export interface IUserData {
  login: TLogin
  data?: Partial<IUserForm>
}

export interface IUserCard extends IUserForm {
  imgUrl?: string
  equipments?: 'all' | IAvailableEquipments
  isVerified?: boolean
  role: TPersonRole
}

export type TAccountData = IUserCard

type TUserFormSettings = {
  [key in keyof typeof personalData]: TInputValue
}

export type IUserForm = {
  [key in keyof TUserFormSettings]: TInputValue
}
