import { Chip } from '@mui/material'

export default function OperateStatus({
  isOperate,
  label,
}: {
  isOperate: boolean | undefined
  label: string | undefined
}) {
  return isOperate ? (
    <div className="operateStatus">
      <Chip label={label ? label : 'В работе'} color="warning" variant="filled" size="medium" />
    </div>
  ) : null
}
