import { Button } from '@mui/material'

interface IProps {
  isDisabled?: boolean
  handleOnClick: () => void
  isLoading?: boolean
}

function OptionalUserFormButtons(props: IProps) {
  const { isDisabled = false, handleOnClick, isLoading } = props

  return (
    <Button
      variant="contained"
      color="error"
      disabled={isDisabled || isLoading}
      onClick={handleOnClick}
    >
      Удалить профиль
    </Button>
  )
}

export default OptionalUserFormButtons
