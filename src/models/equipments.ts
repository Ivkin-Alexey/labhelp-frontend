export type equipmentId = string

export interface IEquipmentItem {
  id: equipmentId
  category: string
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
  serialNumber: string
  inventoryNumber: string
}

export type TEquipmentCard = IEquipmentItem & {
  isCardMode: boolean
}

export interface IAvailableEquipments {
  inaccessible: string[] | []
  available: string[] | []
}
