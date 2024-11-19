import { Container } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import { useFetchOperatingEquipmentsQuery } from '../store/api/equipment/operate-equipment'
import { selectLogin } from '../store/selectors'

export default function OperatingEquipmentsPage() {
  const login = useAppSelector(selectLogin)

  const { isFetching, isError, data: equipmentList } = useFetchOperatingEquipmentsQuery(login)

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
