import { useEffect, useState } from 'react'

import { Container, Typography } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import {
  useFetchEquipmentByIDQuery,
  useFetchEquipmentByIDsQuery,
  useFetchFavoriteEquipmentsQuery,
  useLazyFetchEquipmentByIDsQuery,
} from '../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS, selectLogin } from '../store/selectors'

export default function FavoritesPage() {
  // const login = useAppSelector(selectLogin)

  // const { isFetching, isError, data: equipmentList } = useFetchFavoriteEquipmentsQuery(login)

  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)

  const [fetch, { isFetching, isLoading, isError, data: equipmentList }] =
    useLazyFetchEquipmentByIDsQuery()

  useEffect(() => {
    if (Array.isArray(equipmentIds) && equipmentIds.length > 0) {
      fetch({ equipmentIds })
    }
  }, [])

  useEffect(() => {
    if (Array.isArray(equipmentIds) && equipmentIds.length > 0) {
      fetch({ equipmentIds })
    }
  }, [equipmentIds])

  function renderMessage() {
    if(equipmentIds.length === 0) return <Typography mt="20px">Список пуст</Typography>
  }

  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80vw' }}
    >
      {renderMessage()}
      <CardList
        Component={EquipmentCardList}
        list={equipmentIds.length > 0 ? equipmentList : []}
        isLoading={isLoading}
        isError={isError}
      />
    </Container>
  )
}
