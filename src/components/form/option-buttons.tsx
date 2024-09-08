import { Button } from "@mui/material";
import { TLogin } from "../../models/users";

interface IProps {
    isDisabled?: boolean
    handleOnClick: () => void
}

function OptionalUserFormButtons(props: IProps) {

    const {isDisabled = false, handleOnClick} = props

    return <Button variant="contained" color="error" disabled={isDisabled} onClick={handleOnClick}>Удалить профиль</Button>
}

export default OptionalUserFormButtons