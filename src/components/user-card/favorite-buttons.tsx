import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../app/constants/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import type { EquipmentID } from '../../models/equipments'
import {
  useAddFavoriteEquipmentMutation,
  useDeleteFavoriteEquipmentMutation,
} from '../../store/equipments-api'
import { selectAccount } from '../../store/selectors'

interface IFavoriteButtons {
  isFavorite?: boolean
  equipmentID: EquipmentID
  isCardMode: boolean
}

export default function FavoriteButtons(props: IFavoriteButtons) {
  const { isFavorite = false, equipmentID, isCardMode } = props

  const [add] = useAddFavoriteEquipmentMutation()
  const [remove] = useDeleteFavoriteEquipmentMutation()
  const { isAuth, login } = useAppSelector(selectAccount)
  const navigate = useNavigate()

  function handleAdd() {
    if (isAuth) {
      add({ login, equipmentID })
    } else {
      navigate(routes.signIn)
    }
  }

  function handleDelete() {
    if (isAuth) {
      remove({ login, equipmentID })
    } else {
      navigate(routes.signIn)
    }
  }

  function renderDeleteBtn() {
    return isCardMode ? (
      <IconButton edge="start" aria-label="comments" color="primary" onClick={handleDelete}>
        <StarRoundedIcon />
      </IconButton>
    ) : (
      <Button color="primary" onClick={handleDelete} sx={{padding: '8px 0'}}>
        Удалить из избранного
      </Button>
    )
  }

  function renderAddBtn() {
    return isCardMode ? (
      <IconButton edge="start" aria-label="comments" color="primary" onClick={handleAdd}>
        <StarBorderRoundedIcon />
      </IconButton>
    ) : (
      <Button color="primary" onClick={handleAdd} sx={{padding: '8px 0'}}>
        В избранное
      </Button>
    )
  }

  return isFavorite ? renderDeleteBtn() : renderAddBtn()
}
