import type { SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

import type { AutocompleteInputChangeReason } from '@mui/material'
import { Button, Stack, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import SearchInput from './search-input'
import { SEARCH_DELAY } from '../../app/constants/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import { useDebounce } from '../../app/hooks/useDebounce'
import type { IEquipmentItem } from '../../models/equipments'
import { useAddTermToHistoryMutation } from '../../store/api/equipment/equipments-api'
import { selectIsAuth, selectLogin } from '../../store/selectors'
import EquipmentFilters from '../equipment-filters/equipment-filters'

interface ISearch {
  list?: IEquipmentItem[] | undefined
  isLoading?: boolean
}

export function Search(props: ISearch) {
  const { list = [], isLoading = false } = props

  const [searchParams] = useSearchParams()
  const term = searchParams.get('term')

  const [inputValue, setInputValue] = useState<string>(term || '')

  const isAuth = useAppSelector(selectIsAuth)
  const login = useAppSelector(selectLogin)

  const [add] = useAddTermToHistoryMutation()

  const debouncedValue = useDebounce(inputValue, SEARCH_DELAY)

  const navigate = useNavigate()

  function navigateHelper(term: string) {
    navigate('/search?term=' + term)
    if (isAuth) {
      add({ login, term })
    }
  }

  function handleInputChange(
    e: SyntheticEvent<Element, Event>,
    inputValue: string,
    reason: AutocompleteInputChangeReason,
  ): void {
    setInputValue(inputValue)
  }

  function handleSuggestChange(_e: SyntheticEvent, value: IEquipmentItem | null | string) {
    if (value && typeof value === 'object') {
      navigate('/' + value.id)
    }
  }

  function handleClick() {
    if (inputValue) {
      navigateHelper(inputValue)
    }
  }

  useEffect(() => {
    if (inputValue === '') {
      navigate('/')
    }
  }, [inputValue])

  useEffect(() => {
    if (debouncedValue) {
      navigateHelper(debouncedValue)
    }
  }, [debouncedValue])

  useEffect(() => {
    if (term) {
      setInputValue(term)
    }
  }, [])

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      navigateHelper(inputValue)
    }
  }

  return (
    <Stack spacing={2} direction="column">
      <Typography variant="h5" align='center'>
        Единый каталог учебного и научного лабораторного оборудования
      </Typography>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
        <SearchInput
          handleInputChange={handleInputChange}
          handleChange={handleSuggestChange}
          handleKeyDown={handleKeyDown}
          list={list}
          isLoading={isLoading}
          inputValue={inputValue}
          value={null}
        />
        <Button onClick={handleClick} variant="outlined" sx={{ marginTop: '20px', height: '40px' }}>
          Искать
        </Button>
      </Stack>
      <EquipmentFilters />
    </Stack>
  )
}
