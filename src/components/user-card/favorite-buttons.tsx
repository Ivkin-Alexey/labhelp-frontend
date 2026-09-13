import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Button, IconButton } from '@mui/material'

import { useAppDispatch } from '../../app/hooks/hooks'
import type { equipmentId } from '../../models/equipments'
import { addToFavorite, deleteFromFavorite } from '../../store/equipments-slice'

interface IFavoriteButtons {
  isFavorite?: boolean
  equipmentId: equipmentId
  isCardMode: boolean
}

export default function FavoriteButtons(props: IFavoriteButtons) {
  const { isFavorite = false, equipmentId, isCardMode } = props

  // TODO: избранное на сервере — задача на будущее, сейчас список лежит в localStorage
  // const [add] = useAddFavoriteEquipmentMutation()
  // const [remove] = useDeleteFavoriteEquipmentMutation()
  // const { isAuth, login } = useAppSelector(selectAccount)
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()

  function handleAdd() {
    dispatch(addToFavorite(equipmentId))
    // if (isAuth) {
    //   add({ login, equipmentId })
    // } else {
    //   navigate(routes.signIn)
    // }
  }

  function handleDelete() {
    dispatch(deleteFromFavorite(equipmentId))
    // if (isAuth) {
    //   remove({ login, equipmentId })
    // } else {
    //   navigate(routes.signIn)
    // }
  }

  function renderDeleteBtn() {
    return isCardMode ? (
      <IconButton edge="start" aria-label="comments" color="primary" onClick={handleDelete}>
        <StarRoundedIcon />
      </IconButton>
    ) : (
      <Button color="primary" onClick={handleDelete} sx={{ padding: '8px 0' }}>
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
      <Button color="primary" onClick={handleAdd} sx={{ padding: '8px 0' }}>
        В избранное
      </Button>
    )
  }

  return isFavorite ? renderDeleteBtn() : renderAddBtn()
}
