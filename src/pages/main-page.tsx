import { useEffect, useMemo } from 'react'

import { Container, Typography } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import Carousel from '../components/carousel/carousel'
import EquipmentCardList from '../components/equipment-card-list'
import { Search } from '../components/search/search'
import { useFetchEquipmentsBySearchTermQuery } from '../store/api/equipment/equipments-api'
import { useLazyCheckTokenQuery } from '../store/api/users-api'
import { selectFavoriteEquipmentsFromLS, selectIsAuth, selectLogin } from '../store/selectors'

export default function MainPage() {
  const login = useAppSelector(selectLogin)

  const isAuth = useAppSelector(selectIsAuth)
  const [checkToken, { data, isSuccess }] = useLazyCheckTokenQuery()

  // useEffect(() => {
  //   if (isAuth) {
  //     checkToken()
  //   }
  // }, [])

  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)
  const arg = { login, searchTerm: DEFAULT_SEARCH_TERM }

  const { isFetching, isError, data: equipmentList } = useFetchEquipmentsBySearchTermQuery(arg)

    const transformedList = equipmentList ? equipmentList.map(el => {
          return {
            ...el,
            isFavorite: equipmentIds.includes(el.id)
          }
      }) : []

  return (
    <>
      <Carousel />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Search />
        <CardList
          Component={EquipmentCardList}
          list={transformedList}
          isLoading={isFetching}
          isError={isError}
        />
      </Container>
    </>
  )
}
