import { Verified as VerifiedIcon } from '@mui/icons-material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Box, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { getUserProfilePath } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import type { IUserCard } from '../models/users'
import { useGetUserListQuery } from '../store/api/users-api'
import { selectLogin } from '../store/selectors'

const columns = ['ФИО', 'Логин', 'Категория', 'Роль', 'Статус']

// Колонки, без которых список читается хуже, но которые не влезают
// на узкий экран: на мобиле остаются ФИО, логин и статус
const hiddenOnMobileColumns = ['Категория', 'Роль']

function UsersTable(props: { list: IUserCard[] }) {
  const navigate = useNavigate()

  function renderFio(user: IUserCard) {
    return [user.lastName, user.firstName, user.patronymic].filter(Boolean).join(' ')
  }

  function renderRole(user: IUserCard) {
    if (user.role === 'admin') {
      return 'Администратор'
    }
    return userCategory(user)
  }

  function userCategory(user: IUserCard) {
    if (user.category) {
      return user.category
    }
    if (user.position) {
      return user.position
    }
    return '—'
  }

  function cellSx(title: string) {
    if (hiddenOnMobileColumns.includes(title)) {
      return { display: { xs: 'none', sm: 'table-cell' } }
    }
    return undefined
  }

  return (
    <TableContainer
      sx={{
        width: '100%',
        maxWidth: '900px',
        mt: '20px',
        cursor: 'pointer',
        px: { xs: 1, sm: 2 },
      }}
    >
      <Table size="small" aria-label="Список пользователей">
        <TableHead>
          <TableRow>
            {columns.map(title => (
              <TableCell key={title} sx={cellSx(title)}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.list.map(user => (
            <TableRow
              key={user.login}
              hover
              onClick={() => navigate(getUserProfilePath(user.login))}
            >
              <TableCell>{renderFio(user)}</TableCell>
              <TableCell>{user.login}</TableCell>
              <TableCell sx={cellSx('Категория')}>{userCategory(user)}</TableCell>
              <TableCell sx={cellSx('Роль')}>{renderRole(user)}</TableCell>
              <TableCell align="center">
                {user.isVerified && (
                  <Tooltip title="Подтверждён">
                    <VerifiedIcon color="success" aria-label="Пользователь подтверждён" />
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function UsersListPage() {
  // Эндпоинт требует логин текущей учётной записи для проверки прав на сервере
  const accountLogin = useAppSelector(selectLogin)
  const { isLoading, isError, data: userList } = useGetUserListQuery(accountLogin)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Typography variant="h5" textAlign="center" mt="20px">
        Пользователи
      </Typography>
      <CardList Component={UsersTable} list={userList} isLoading={isLoading} isError={isError} />
    </Box>
  )
}
