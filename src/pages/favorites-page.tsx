import { useEffect, useState } from 'react'

import { Container } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import {
  useFetchEquipmentByIDQuery,
  useFetchEquipmentByIDsQuery,
  useFetchFavoriteEquipmentsQuery,
} from '../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS, selectLogin } from '../store/selectors'

export default function FavoritesPage() {
  // const login = useAppSelector(selectLogin)

  // const { isFetching, isError, data: equipmentList } = useFetchFavoriteEquipmentsQuery(login)

  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)

  const { isFetching, isLoading, isError, data: equipmentList } = useFetchEquipmentByIDsQuery({equipmentIds})

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardList
        Component={EquipmentCardList}
        list={(Array.isArray(equipmentIds) && equipmentIds.length > 0) ? equipmentList : []}
        isLoading={isFetching}
        isError={isError}
      />
    </Container>
  )
}
