import { Container } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import { Search } from '../components/search/search'
import { useFetchEquipmentsBySearchTermQuery } from '../store/equipments-api'
import { selectAccount } from '../store/selectors'

export default function AdminPage() {
  const { login } = useAppSelector(selectAccount)

const isFetching = false
const isError = false

const userList = [
    {
        imgUrl: null,
        login: "26593",
        password: "atd647", 
        fullName: "Ивкин Алексей Сергеевич", 
        position: "заведующий лабораторией", 
        department: "НЦ Переработки ресурсов", 
        equipments: "all"
    },
    {
        imgUrl: null,
        login: "26594", 
        password: "atd647", 
        fullName: "Иванов Иван Иванович", 
        position: "научный сотрудник", 
        department: "НЦ Переработки ресурсов", 
        equipments: {inaccessible: [1, 2, 3], available: [4, 5, 6]}
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
      <CardList list={userList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}