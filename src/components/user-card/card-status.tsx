import { Chip } from '@mui/material'

interface ICardStatus {
  isVisible: boolean
  text: string | undefined
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

export default function CardStatus(props: ICardStatus) {
  return props.isVisible && props.text ? (
    <div className="cardStatus">
      <Chip label={props.text} color={props.color || 'warning'} variant="filled" size="medium" />
    </div>
  ) : null
}
