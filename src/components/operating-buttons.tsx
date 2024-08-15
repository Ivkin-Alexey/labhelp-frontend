import { Button,} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants'
import { useAppSelector } from '../app/hooks/hooks'
import type { EquipmentID } from '../models/equipments'
import {
  useAddOperatingEquipmentMutation,
  useDeleteOperatingEquipmentMutation,
} from '../store/equipments-api'
import { selectAccount } from '../store/selectors'

interface IOperateButtons {
  isOperate?: boolean
  equipmentID: EquipmentID
}

export default function OperateButtons(props: IOperateButtons) {
  const { isOperate = false, equipmentID } = props

  const [add] = useAddOperatingEquipmentMutation()
  const [remove] = useDeleteOperatingEquipmentMutation()
  const { isAuth, login } = useAppSelector(selectAccount)
  const navigate = useNavigate()

  return isOperate ? (
    <Button
      color="primary"
      onClick={() => {
        if (isAuth) {
          remove({ login, equipmentID })
        } else {
          navigate(routes.signIn)
        }
      }}
    >
      Завершить
    </Button>
  ) : (
    <Button
      color="primary"
      onClick={() => {
        if (isAuth) {
          add({ login, equipmentID })
        } else {
          navigate(routes.signIn)
        }
      }}
    >
      Начать
    </Button>
  )
}
