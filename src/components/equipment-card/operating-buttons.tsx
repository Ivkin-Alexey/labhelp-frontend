import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../app/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import type { EquipmentID } from '../../models/equipments'
import {
  useAddOperatingEquipmentMutation,
  useDeleteOperatingEquipmentMutation,
} from '../../store/equipments-api'
import { selectAccount } from '../../store/selectors'

interface IOperateButtons {
  isOperate?: boolean
  equipmentID: EquipmentID
  userID: string | undefined
}

export default function OperateButtons(props: IOperateButtons) {
  const { isOperate = false, equipmentID, userID } = props

  const [add] = useAddOperatingEquipmentMutation()
  const [remove] = useDeleteOperatingEquipmentMutation()
  const { isAuth, login } = useAppSelector(selectAccount)
  const navigate = useNavigate()

  function renderEndBtn() {

    if (userID !== login) { return null}
    
    return (
      <Button
        color="primary"
        onClick={() => {
          if (isAuth) {
            console.log( login, equipmentID)
            remove({ login, equipmentID })
          } else {
            navigate(routes.signIn)
          }
        }}
      >
        Завершить
      </Button>
    )
  }

  function renderStartBtn() {
    return (
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

  return isOperate ? renderEndBtn() : renderStartBtn()
}
