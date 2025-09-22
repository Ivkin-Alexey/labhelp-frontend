import { Box, Container, Pagination, Typography } from '@mui/material'

import { SEARCH_SUGGEST_NUMBER } from '../app/constants/constants'
import { useAppDispatch, useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import { Search } from '../components/search/search'
import { useLazyFetchEquipmentsBySearchTermQuery } from '../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS, selectSearchResultPage } from '../store/selectors'
import { PAGE, PAGE_SIZE, routes, SEARCH_DELAY } from '../app/constants/constants'

import {
  selectEquipmentSearchFilters,
  selectEquipmentSearchTerm,
  selectLogin,
} from '../store/selectors'
import { useState } from 'react'
import { setSearchResultPage } from '../store/equipments-slice'

export default function SearchPage() {
  const [fetchEquipments, { isFetching, isLoading, isError, data }] =
    useLazyFetchEquipmentsBySearchTermQuery()

  // const suggestList = equipmentList?.slice(0, SEARCH_SUGGEST_NUMBER)

  const dispatch = useAppDispatch()
  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)
  const inputValue = useAppSelector(selectEquipmentSearchTerm)
  const filters = useAppSelector(selectEquipmentSearchFilters)
  const savedPage = useAppSelector(selectSearchResultPage)
  const login = useAppSelector(selectLogin)

  const totalEquipmentCards = data?.totalEquipmentCards
  const totalEquipmentUnits = data?.totalEquipmentUnits
  const count = totalEquipmentCards ? Math.ceil(totalEquipmentCards/PAGE_SIZE) : undefined
  const isPaginationVisible = Boolean(totalEquipmentCards && totalEquipmentCards > PAGE_SIZE && !isFetching && !isLoading)

  const transformedList = data
    ? data.results.map(el => {
        return {
          ...el,
          isFavorite: equipmentIds.includes(el.id),
        }
      })
    : []

    function handlePageChange(event: React.ChangeEvent<unknown>, page: number): void {
      // dispatch(setSearchResultPage(page))
      fetchEquipments({
        login,
        ...(filters && { filters }),
        searchTerm: inputValue,
        page,
        pageSize: PAGE_SIZE,
      })
  }

  function renderCounter() {
    if(isLoading || isFetching || isError) return
    
    if(totalEquipmentUnits === 0) {
      return <Typography mt="20px">Ничего не найдено</Typography>
    }
    
    return <Typography mt="20px">Найдено результатов: {totalEquipmentUnits}</Typography>
  }

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80vw' }}
    >
      <Search
        // list={suggestList}
        isLoading={isFetching}
        fetchEquipments={fetchEquipments}
        isError={isError}
        showTotalCount={true}
      />
      {renderCounter()}
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
          isLoading={isLoading || isFetching}
          isError={isError}
        />
      </Box>
      {isPaginationVisible && <Pagination sx={{mb: "20px"}} page={data?.page} count={count} color="primary" onChange={handlePageChange}/>}
    </Container>
  )
}
