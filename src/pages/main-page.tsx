import { useState, useEffect } from 'react'

import { Container } from '@mui/material'

import { BASE_URL } from '../app/constants'
import CardList from '../components/equipment-card-list'
import type { EquipmentItem } from '../models/equipments'

export default function MainPage() {
  const [equipmentList, setEquipmentList] = useState<null | EquipmentItem[]>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const fetchEquipmentList = async () => {
      try {
        setIsLoading(true)
        setIsError(false)
        const response = await fetch(BASE_URL + 'equipmentList?category=Микроскопы')
        const json = await response.json()
        setEquipmentList(json)
        setIsLoading(false)
      } catch (e) {
        setIsError(true)
      }
    }

    fetchEquipmentList()
  }, [])

  return (
    <Container
      sx={{
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        columnGap: '20px',
      }}
    >
      <CardList list={equipmentList} isLoading={isLoading} isError={isError} />
    </Container>
  )
}
