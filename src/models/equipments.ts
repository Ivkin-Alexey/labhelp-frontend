import type { TLogin } from './users'

export type equipmentId = string

export interface IEquipmentItem {
  id: equipmentId
  category: string
  kind: string
  type: string
  classification: string
  department: string
  measurements: string
  description: string
  name: string
  brand: string
  model: string
  imgUrl: string
  isFavorite?: boolean
  isOperate?: boolean
  login?: string
  userId?: string
  userName?: string
  sameList?: string[]
  serialNumber: string
  inventoryNumber: string
}

export interface IEquipmentSearchResult {
  results: IEquipmentItem[]
  page: number
  totalCount: number
}

export type TEquipmentFilters = IEquipmentFilter[]

export interface IEquipmentFilter {
  label: string
  name: string
  options: string[]
}

export interface IEquipmentFilterState {
  [key: string]: string[]
}

export interface ISearchArg {
  login?: TLogin
  searchTerm: string
  filters?: IEquipmentFilterState
  page: number
  pageSize: number
}

export interface IQueriesObject {
  [key: string]: string[] | string | number
}

export type TEquipmentCard = IEquipmentItem & {
  isCardMode: boolean
}

export interface IAvailableEquipments {
  inaccessible: string[] | []
  available: string[] | []
}
