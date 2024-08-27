import { Container } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import { useFetchOperatingEquipmentsQuery } from '../store/equipments-api'
import { selectAccount } from '../store/selectors'

export default function OperatingEquipmentsPage() {
  const { login } = useAppSelector(selectAccount)

  const { isFetching, isError, data: equipmentList } = useFetchOperatingEquipmentsQuery(login)
  
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardList list={equipmentList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}