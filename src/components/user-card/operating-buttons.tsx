import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../app/constants/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import type { EquipmentID } from '../../models/equipments'
import {
  useAddOperatingEquipmentMutation,
  useDeleteOperatingEquipmentMutation,
} from '../../store/equipments-api'
import { selectAccount } from '../../store/selectors'
import { useDeletePersonMutation } from '../../store/users-api'

interface IOperateButtons {
  isOperate?: boolean
  equipmentID: EquipmentID
  login: string
}

export default function OperateButtons(props: IOperateButtons) {
  const { isOperate, equipmentID, login } = props

  const [add] = useAddOperatingEquipmentMutation()
  const [remove] = useDeletePersonMutation
  const { isAuth, accountData } = useAppSelector(selectAccount)
  const {login: accountLogin} = accountData
  const navigate = useNavigate()

  function renderEndBtn() {

    if (login !== accountLogin) { return null}
    
    return (
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
