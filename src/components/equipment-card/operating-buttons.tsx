import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../app/constants/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import type { EquipmentID } from '../../models/equipments'
import {
  useAddOperatingEquipmentMutation,
  useDeleteOperatingEquipmentMutation,
} from '../../store/equipments-api'
import { selectAccount, selectLogin } from '../../store/selectors'

interface IOperateButtons {
  isOperate?: boolean
  equipmentID: EquipmentID
  login?: string
}

export default function OperateButtons(props: IOperateButtons) {
  const { isOperate, equipmentID, login: operatePersonLogin } = props

  const [add] = useAddOperatingEquipmentMutation()
  const [remove] = useDeleteOperatingEquipmentMutation()
  const { isAuth } = useAppSelector(selectAccount)
  const accountLogin = useAppSelector(selectLogin)
  const navigate = useNavigate()

  function renderEndBtn() {

    if (operatePersonLogin !== accountLogin) { return null}
    
    return (
      <Button
        color="primary"
        onClick={() => {
          if (isAuth) {
            remove({ login: accountLogin, equipmentID })
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
            add({ login: accountLogin, equipmentID })
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
function useAppDispath() {
  throw new Error('Function not implemented.')
}

