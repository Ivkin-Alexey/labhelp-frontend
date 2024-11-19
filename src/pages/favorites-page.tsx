import { Container } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import { useFetchFavoriteEquipmentsQuery } from '../store/api/equipment/equipments-api'
import { selectLogin } from '../store/selectors'

export default function FavoritesPage() {
  const login = useAppSelector(selectLogin)

  const { isFetching, isError, data: equipmentList } = useFetchFavoriteEquipmentsQuery(login)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardList
        Component={EquipmentCardList}
        list={equipmentList}
        isLoading={isFetching}
        isError={isError}
      />
    </Container>
  )
}
