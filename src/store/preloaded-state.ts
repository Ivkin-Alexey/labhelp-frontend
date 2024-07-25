import type { EquipmentItem } from '../models/equipments'

export interface State {
  equipments: [] | EquipmentItem[]
  account: { isAuth: boolean }
}

export const preloadedState: State = {
  equipments: [],
  account: { isAuth: JSON.parse(localStorage.getItem('isAuth') || 'false') },
}
