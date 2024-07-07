export type EquipmentID = string

export interface EquipmentItem {
    id: EquipmentID,
    category: string,
    name: string,
    brand: string,
    model: string,
    imgUrl: string,
}