import { Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../app/hooks/hooks'
import HistoryList from '../components/history-list'
import {
  useDeleteTermFromHistoryMutation,
  useFetchSearchHistoryQuery,
} from '../store/equipments-api'

export default function HistoryPage() {
  const { login } = useAppSelector(state => state.account)

  const { data: list } = useFetchSearchHistoryQuery(login)

  const [remove] = useDeleteTermFromHistoryMutation()

  const navigate = useNavigate()

  function handleClick(value: string) {
    navigate('/search?term=' + value)
  }

  function handleDelete(term: string) {
    remove({ login, term })
  }

  if (Array.isArray(list)) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {list?.length === 0 ? (
          <Typography gutterBottom variant="body1" component="div" marginTop="40px">
            История поиска пуста
          </Typography>
        ) : (
          <HistoryList list={list} handleClick={handleClick} handleDelete={handleDelete} />
        )}
      </Container>
    )
  }
}
