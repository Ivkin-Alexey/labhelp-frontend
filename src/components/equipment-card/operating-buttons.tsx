import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../app/constants/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import type { equipmentId } from '../../models/equipments'
import {
  useAddOperatingEquipmentMutation,
  useDeleteOperatingEquipmentMutation,
} from '../../store/api/equipment/operate-equipment'
import { selectIsAuth, selectLogin } from '../../store/selectors'

interface IOperateButtons {
  isOperate?: boolean
  equipmentId: equipmentId
  login?: string
}

export default function OperateButtons(props: IOperateButtons) {
  const { isOperate, equipmentId, login: operatePersonLogin } = props

  const { searchTerm } = useAppSelector(selectEquipments)
  const [add] = useAddOperatingEquipmentMutation()
  const [remove] = useDeleteOperatingEquipmentMutation()
  const isAuth = useAppSelector(selectIsAuth)
  const accountLogin = useAppSelector(selectLogin)
  const navigate = useNavigate()

  function renderEndBtn() {
    if (operatePersonLogin !== accountLogin) {
      return null
    }

    return (
      <Button
        color="primary"
        onClick={() => {
          if (isAuth) {
            remove({ login: accountLogin, equipmentId })
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
            add({ login: accountLogin, equipmentId })
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
