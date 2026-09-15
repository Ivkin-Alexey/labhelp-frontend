import { useEffect } from 'react'

import { Container, Typography } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import { useLazyFetchEquipmentByIDsQuery } from '../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS } from '../store/selectors'

export default function FavoritesPage() {
  // const login = useAppSelector(selectLogin)

  // const { isFetching, isError, data: equipmentList } = useFetchFavoriteEquipmentsQuery(login)

  const equipmentIds = useAppSelector(selectFavoriteEquipmentsFromLS)

  const [fetch, { isLoading, isError, data: equipmentList }] = useLazyFetchEquipmentByIDsQuery()

  useEffect(() => {
    if (Array.isArray(equipmentIds) && equipmentIds.length > 0) {
      fetch({ equipmentIds })
    }
  }, [equipmentIds, fetch])

  function renderMessage() {
    if (equipmentIds.length === 0) {
      return <Typography mt="20px">Список пуст</Typography>
    }

    // Список загружен, но сервер не нашёл ни одного id: избранное собрано на
    // устаревших данных (например, до пересинхронизации БД). Без этого
    // сообщения страница выглядела бы просто пустой
    if (!isLoading && !isError && Array.isArray(equipmentList) && equipmentList.length === 0) {
      return (
        <Typography mt="20px">
          Оборудование из избранного не найдено. Возможно, список устарел — добавьте
          карточки заново
        </Typography>
      )
    }
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
