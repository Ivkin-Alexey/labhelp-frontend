import { Container } from '@mui/material'

import {EquipmentCard} from '../components/equipment-card'

export default function MainPage() {
  const card = {
    id: 0,
    title: 'Title',
    description: 'Description',
    imgUrl: '#',
    handleClick(e: React.MouseEvent, id: number) {},
    handleBtnClick(e: React.MouseEvent, id: number) {},
  }

  const arr = []

  for (let i = 0; i < 5; i++) {
    const newCard = Object.assign({}, card)
    newCard.id = i
    arr.push(newCard)
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
      {arr.map(el => {
        const { id, title, description, imgUrl, handleBtnClick, handleClick } = el

        return (
          <EquipmentCard
            key={id}
            id={id}
            title={title}
            description={description}
            imgUrl={imgUrl}
            handleClick={handleClick}
            handleBtnClick={handleBtnClick}
          />
        )
      })}
    </Container>
  )
}
