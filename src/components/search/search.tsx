import type { SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

import type { AutocompleteInputChangeReason } from '@mui/material'
import { Button, Stack, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import EquipmentFilters from './equipment-filters'
import SearchInput from './search-input'
import { SEARCH_DELAY } from '../../app/constants/constants'
import { useAppSelector } from '../../app/hooks/hooks'
import { useDebounce } from '../../app/hooks/useDebounce'
import type { IEquipmentFilterState, IEquipmentItem } from '../../models/equipments'
import { useAddTermToHistoryMutation } from '../../store/api/equipment/equipments-api'
import { selectIsAuth, selectLogin } from '../../store/selectors'

interface ISearch {
  list?: IEquipmentItem[] | undefined
  isLoading?: boolean
}

export function Search(props: ISearch) {
  const { list = [], isLoading = false } = props

  const [searchParams] = useSearchParams()
  const term = searchParams.get('term')

  const [inputValue, setInputValue] = useState<string>(term || '')
  const [filtersState, setFiltersState] = useState<IEquipmentFilterState>({})
  const [isFiltered, setIsFiltered] = useState<boolean>(false)

  const isAuth = useAppSelector(selectIsAuth)
  const login = useAppSelector(selectLogin)

  const [add] = useAddTermToHistoryMutation()

  const debouncedValue = useDebounce(inputValue, SEARCH_DELAY)

  const navigate = useNavigate()

  function prepareFiltersState() {
    const queryParams = new URLSearchParams()
    for (const [key, value] of Object.entries(filtersState)) {
      queryParams.append(key, JSON.stringify(value))
    }
    return queryParams.toString()
  }

  function navigateHelper(term: string) {
    const filterPart = prepareFiltersState()
    navigate('/search?term=' + term + filterPart)
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
    let isChanged = false
    for (let key in filtersState) {
      if (filtersState[key].length > 0) {
        isChanged = true
        break
      }
    }
    setIsFiltered(isChanged)
  }, [filtersState])

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
      <Typography variant="h5" align="center">
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
        <Button
          onClick={handleClick}
          disabled={!inputValue && !isFiltered}
          variant={isFiltered ? 'contained' : 'outlined'}
          sx={{ marginTop: '20px', height: '40px' }}
        >
          {isFiltered ? 'Применить фильтры' : 'Искать'}
        </Button>
      </Stack>
      <EquipmentFilters state={filtersState} setState={setFiltersState} />
    </Stack>
  )
}
