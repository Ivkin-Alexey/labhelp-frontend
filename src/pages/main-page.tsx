import { Suspense, useEffect, useMemo } from 'react'
import React from 'react'

import type { Theme} from '@mui/material';
import { Container, Typography, useMediaQuery } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import { Search } from '../components/search/search'
import { useFetchEquipmentsBySearchTermQuery } from '../store/api/equipment/equipments-api'
import { useLazyCheckTokenQuery } from '../store/api/users-api'
import { selectFavoriteEquipmentsFromLS, selectIsAuth, selectLogin } from '../store/selectors'
import theme from '../theme'
const Carousel = React.lazy(() => import('../components/carousel/carousel'))

export default function MainPage() {
  const login = useAppSelector(selectLogin)

  const isAuth = useAppSelector(selectIsAuth)

  // useEffect(() => {
  //   if (isAuth) {
  //     checkToken()
  //   }
  // }, [])

  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)
  const arg = { login, searchTerm: DEFAULT_SEARCH_TERM, page: 1, pageSize: 100 }

  const { isFetching, isError, data } = useFetchEquipmentsBySearchTermQuery(arg)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const transformedList = data
    ? data.results.map(el => {
        return {
          ...el,
          isFavorite: equipmentIds.includes(el.id),
        }
      })
    : []

    function renderCarousel() {
      if(isMobile) {return null}
      return(<Suspense fallback={<div>Загрузка карусели...</div>}>
       <Carousel />
      </Suspense>)
    }

  return (
    <>
      {renderCarousel()}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '80vw',
          flex: '1 0 auto',
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
