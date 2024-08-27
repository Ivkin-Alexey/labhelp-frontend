import { Container } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import { Search } from '../components/search/search'
import { useFetchEquipmentsBySearchTermQuery } from '../store/equipments-api'
import { selectAccount } from '../store/selectors'
import { IUserCard } from '../models/users'
import UserCardList from '../components/user-card-list'

export default function AdminPage() {
  const { login } = useAppSelector(selectAccount)

const isFetching = false
const isError = false

const userList: IUserCard[] = [
  {
    login: "26594",
    password: "123456",
    fullName: "Иванов Иван Иванович",
    position: "научный сотрудник",
    department: "НЦ Переработки ресурсов",
    equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
    isVerified: false
  },
  {
    login: "26595",
    password: "123456",
    fullName: "Иванов Иван Иванович",
    position: "научный сотрудник",
    department: "НЦ Переработки ресурсов",
    equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
    isVerified: false
  },
  {
    login: "26596",
    password: "123456",
    fullName: "Иванов Иван Иванович",
    position: "научный сотрудник",
    department: "НЦ Переработки ресурсов",
    equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
    isVerified: false
  },
  {
    login: "26597",
    password: "123456",
    fullName: "Иванов Иван Иванович",
    position: "научный сотрудник",
    department: "НЦ Переработки ресурсов",
    equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
    isVerified: false
  },
  {
    login: "26598",
    password: "123456",
    fullName: "Иванов Иван Иванович",
    position: "научный сотрудник",
    department: "НЦ Переработки ресурсов",
    equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
    isVerified: false
  },
    {
      login: "26599",
      password: "123456",
      fullName: "Иванов Иван Иванович",
      position: "научный сотрудник",
      department: "НЦ Переработки ресурсов",
      equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
      isVerified: false
    },
]

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* <Search /> */}
      <CardList Component={UserCardList} list={userList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}