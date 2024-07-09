import { Container } from '@mui/material'

import { defaultSearchPrompt } from '../app/constants'
import CardList from '../components/equipment-card-list'
import { useFetchEquipmentsByCategoryQuery } from '../store/equipments-api'

export default function MainPage() {
  const {
    isFetching,
    isError,
    data: equipmentList,
  } = useFetchEquipmentsByCategoryQuery(defaultSearchPrompt)

  return (
    <Container
      sx={{
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        columnGap: '20px',
      }}
    >
      <CardList list={equipmentList} isLoading={isFetching} isError={isError} />
    </Container>
  )
}
