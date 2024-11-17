import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../app/constants/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import type { equipmentId } from '../../models/equipments'
import { useAddOperatingEquipmentMutation } from '../../store/api/equipment/operate-equipment'
import { useDeletePersonMutation } from '../../store/api/users-api'
import { selectAccount } from '../../store/selectors'

interface IOperateButtons {
  isOperate?: boolean
  equipmentId: equipmentId
  login: string
}

export default function OperateButtons(props: IOperateButtons) {
  const { isOperate, equipmentId, login } = props

  const [add] = useAddOperatingEquipmentMutation()
  const [remove] = useDeletePersonMutation()
  const { isAuth, accountData } = useAppSelector(selectAccount)
  const { login: accountLogin } = accountData
  const navigate = useNavigate()

  function renderEndBtn() {
    if (login !== accountLogin) {
      return null
    }

    return (
      <Button
        color="primary"
        onClick={() => {
          if (isAuth) {
            remove({ login, equipmentId })
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
            add({ login, equipmentId })
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
