import type React from 'react'
import { useState, useEffect } from 'react'

import { CircularProgress, Container } from '@mui/material'

import { BASE_URL } from '../app/constants'
import { EquipmentCard } from '../components/equipment-card'
import type { EquipmentID, EquipmentItem } from '../models/equipments'

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

  function handleClick(e: React.MouseEvent, id: EquipmentID) {}
  function handleBtnClick(e: React.MouseEvent, id: EquipmentID) {}

  function renderEquipmentList() {
    if (isLoading) {
      return <CircularProgress size="60px" />
    }

    if (isError) {
      return <h3>Произошла ошибка</h3>
    }

    if (!isLoading && Array.isArray(equipmentList)) {
      return equipmentList.map(el => {
        const { id, imgUrl, name, model } = el

        return (
          <EquipmentCard
            key={id}
            id={id}
            title={name}
            description={model}
            imgUrl={imgUrl}
            handleClick={handleClick}
            handleBtnClick={handleBtnClick}
          />
        )
      })
    }
  }

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
      {renderEquipmentList()}
    </Container>
  )
}
