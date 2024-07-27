import { Container } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/equipment-card-list'
import { useFetchFavoriteEquipmentsQuery } from '../store/equipments-api'

export default function FavoritesPage() {
  const { login } = useAppSelector(state => state.account)

  const { isFetching, isError, data: equipmentList } = useFetchFavoriteEquipmentsQuery(login)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardList list={equipmentList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}
