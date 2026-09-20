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

  return (
    <TableContainer
      sx={{
        width: '100%',
        maxWidth: '900px',
        mt: '20px',
        cursor: 'pointer',
      }}
    >
      <Table size="small" aria-label="Список пользователей">
        <TableHead>
          <TableRow>
            {columns.map(title => (
              <TableCell key={title}>{title}</TableCell>
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
              <TableCell>{userCategory(user)}</TableCell>
              <TableCell>{renderRole(user)}</TableCell>
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80vw' }}>
      <Typography variant="h5" textAlign="center" mt="20px">
        Пользователи
      </Typography>
      <CardList Component={UsersTable} list={userList} isLoading={isLoading} isError={isError} />
    </Box>
  )
}
