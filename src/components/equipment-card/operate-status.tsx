import { Chip } from '@mui/material'

export default function OperateStatus({ isOperate, userName }: { isOperate: boolean | undefined, userName: string | undefined}) {
  return isOperate ? (
    <div className='operateStatus'>
      <Chip label={userName ? userName : "В работе"} color="warning" variant="filled" size='medium'/>
    </div>
  ) : null
}
