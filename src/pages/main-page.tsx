import { useEffect } from 'react'

import { Container, Typography } from '@mui/material'

import { DEFAULT_SEARCH_TERM } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import { Search } from '../components/search/search'
import { useFetchEquipmentsBySearchTermQuery } from '../store/api/equipment/equipments-api'
import { useLazyCheckTokenQuery } from '../store/api/users-api'
import { selectIsAuth, selectLogin } from '../store/selectors'

export default function MainPage() {
  const login = useAppSelector(selectLogin)
  const arg = { login, searchTerm: DEFAULT_SEARCH_TERM }
  const isAuth = useAppSelector(selectIsAuth)
  const [checkToken, { data, isSuccess }] = useLazyCheckTokenQuery()

  // useEffect(() => {
  //   if (isAuth) {
  //     checkToken()
  //   }
  // }, [])

  const { isFetching, isError, data: equipmentList } = useFetchEquipmentsBySearchTermQuery(arg)

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" align="center" mb="20px" mt="20px">
        Единый каталог учебного и научного лабораторного оборудования
      </Typography>
      <Search />
      <CardList
        Component={EquipmentCardList}
        list={equipmentList}
        isLoading={isFetching}
        isError={isError}
      />
    </Container>
  )
}
