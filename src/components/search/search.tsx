import { useEffect, useState } from 'react'

import { Button, Stack, TextField } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import SearchInput from './search-input'
import { SEARCH_DELAY } from '../../app/constants'
import { useDebounce } from '../../app/hooks/useDebounce'
import type { EquipmentItem } from '../../models/equipments'

interface ISearch {
  list?: EquipmentItem[] | undefined
}

export function Search(props: ISearch) {

const {list = []} = props

  const [searchParams] = useSearchParams()
  const term = searchParams.get('term')

  const [value, setValue] = useState<string>(term ?? '')

  const debouncedValue = useDebounce(value, SEARCH_DELAY)

  const navigate = useNavigate()

  function navigateHelper(term: string) {
    navigate('/search?term=' + term)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value)
  }

  function handleClick() {
    navigateHelper(value)
  }

  useEffect(() => {
    if (debouncedValue) {
      navigateHelper(debouncedValue)
    }
  }, [debouncedValue])

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      navigateHelper(value)
    }
  }

  return (
    <Stack spacing={2} direction="row">
      <SearchInput handleChange={handleChange} handleKeyDown={handleKeyDown} list={list}/>
      <Button onClick={handleClick} variant="outlined" sx={{ marginTop: '20px', height: '40px' }}>
        Искать
      </Button>
    </Stack>
  )
}
