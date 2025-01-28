import { useEffect, useState } from 'react'

import { Container } from '@mui/material'

import { useAppSelector } from '../app/hooks/hooks'
import CardList from '../components/card-list'
import EquipmentCardList from '../components/equipment-card-list'
import {
  useFetchEquipmentByIDQuery,
  useFetchFavoriteEquipmentsQuery,
} from '../store/api/equipment/equipments-api'
import { selectFavoriteEquipmentsFromLS, selectLogin } from '../store/selectors'

export default function FavoritesPage() {
  // const login = useAppSelector(selectLogin)

  // const { isFetching, isError, data: equipmentList } = useFetchFavoriteEquipmentsQuery(login)

  const favoriteIds = useAppSelector(selectFavoriteEquipmentsFromLS)
  const [equipmentList, setEquipmentList] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const equipmentQueries = ids.map(id => useFetchEquipmentByIDQuery(id))

  const loading = equipmentQueries.some(query => query.isLoading)
  const error = equipmentQueries.find(query => query.error)

  const equipmentData = equipmentQueries.map(query => query.data).filter(data => data)

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        setIsLoading(true)
        const fetchedData = []

        for (const id of favoriteIds) {
          const result = await useFetchEquipmentByIDQuery({ equipmentId: id }).unwrap()
          fetchedData.push(result)
        }

        setEquipmentList(fetchedData)
      } catch (err) {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEquipmentData()
  }, [favoriteIds])

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CardList
        Component={EquipmentCardList}
        list={equipmentList}
        isLoading={isLoading}
        isError={isError}
      />
    </Container>
  )
}
