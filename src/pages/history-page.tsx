import { Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants/constants'
import { useAppSelector, useAppDispatch } from '../app/hooks/hooks'
import HistoryList from '../components/history-list'
import {
  useDeleteTermFromHistoryMutation,
  useFetchSearchHistoryQuery,
} from '../store/api/equipment/equipments-api'
import { setSearchTerm } from '../store/equipments-slice'
import { selectLogin } from '../store/selectors'

export default function HistoryPage() {
  const login = useAppSelector(selectLogin)
  const dispatch = useAppDispatch()

  const { data: list } = useFetchSearchHistoryQuery(login)

  const [remove] = useDeleteTermFromHistoryMutation()

  const navigate = useNavigate()

  function handleClick(value: string) {
    dispatch(setSearchTerm(value))
    navigate(routes.search)
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
