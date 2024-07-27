import type { EquipmentItem } from '../models/equipments'

export interface State {
  equipments: [] | EquipmentItem[]
  account: {
    login?: string | false
    isAuth: boolean 
}
}

export const preloadedState: State = {
  equipments: [],
  account: {
    isAuth: JSON.parse(localStorage.getItem('isAuth') || "false"),
    login: JSON.parse(localStorage.getItem('login') || "false") 
  },
}
