import { Box, Container } from '@mui/material'

import { SEARCH_SUGGEST_NUMBER } from '../app/constants/constants'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import { Search } from '../components/search/search'
import { useLazyFetchEquipmentsBySearchTermQuery } from '../store/api/equipment/equipments-api'

export default function SearchPage() {

  const [fetchEquipments, { isFetching, isLoading, isError, data: equipmentList }] = useLazyFetchEquipmentsBySearchTermQuery()

  const suggestList = equipmentList?.slice(0, SEARCH_SUGGEST_NUMBER)

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Search list={suggestList} isLoading={isFetching} fetchEquipments={fetchEquipments} isError={isError} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          columnGap: '20px',
        }}
      >
        <CardList
          Component={EquipmentCardList}
          list={equipmentList}
          isLoading={isFetching || isLoading}
          isError={isError}
        />
      </Box>
    </Container>
  )
}

