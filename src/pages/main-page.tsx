import { Container } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants'
import CardList from '../components/equipment-card-list'
import { Search } from '../components/search/search'
import { useFetchEquipmentsByCategoryQuery } from '../store/equipments-api'

export default function MainPage() {
  const {
    isFetching,
    isError,
    data: equipmentList,
  } = useFetchEquipmentsByCategoryQuery(DEFAULT_SEARCH_TERM)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Search />
      <CardList list={equipmentList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}
