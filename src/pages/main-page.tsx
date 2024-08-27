import { Container } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import { Search } from '../components/search/search'
import { useFetchEquipmentsBySearchTermQuery } from '../store/equipments-api'
import { selectAccount } from '../store/selectors'

export default function MainPage() {
  const { login } = useAppSelector(selectAccount)
  const arg = { login, searchTerm: DEFAULT_SEARCH_TERM }

  const { isFetching, isError, data: equipmentList } = useFetchEquipmentsBySearchTermQuery(arg)

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Search />
      <CardList list={equipmentList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}
