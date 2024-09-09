import { Container } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import { useFetchFavoriteEquipmentsQuery, useFetchOperatingEquipmentsQuery } from '../store/equipments-api'
import { selectLogin } from '../store/selectors'
import EquipmentCardList from '../components/equipment-card-list'

export default function OperatingEquipmentsPage() {
  const login = useAppSelector(selectLogin)

  const { isFetching, isError, data: equipmentList } = useFetchOperatingEquipmentsQuery(login)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardList Component={EquipmentCardList} list={equipmentList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}