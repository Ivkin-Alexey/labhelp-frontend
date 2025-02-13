import { Box, Container } from '@mui/material'

import { SEARCH_SUGGEST_NUMBER } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import { Search } from '../components/search/search'
import { useLazyFetchEquipmentsBySearchTermQuery } from '../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS } from '../store/selectors'

export default function SearchPage() {
  const [fetchEquipments, { isFetching, isLoading, isError, data }] =
    useLazyFetchEquipmentsBySearchTermQuery()

  // const suggestList = equipmentList?.slice(0, SEARCH_SUGGEST_NUMBER)

  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)

  const transformedList = data
    ? data.results.map(el => {
        return {
          ...el,
          isFavorite: equipmentIds.includes(el.id),
        }
      })
    : []

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80vw' }}
    >
      <Search
        // list={suggestList}
        isLoading={isFetching}
        fetchEquipments={fetchEquipments}
        isError={isError}
      />
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
          list={transformedList}
          isLoading={isFetching || isLoading}
          isError={isError}
        />
      </Box>
    </Container>
  )
}
