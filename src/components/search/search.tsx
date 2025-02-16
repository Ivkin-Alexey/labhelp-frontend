import type { SyntheticEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'

import type { AutocompleteInputChangeReason } from '@mui/material'
import { Button, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import EquipmentFilters from './equipment-filters'
import SearchInput from './search-input'
import { PAGE, PAGE_SIZE, routes, SEARCH_DELAY } from '../../app/constants/constants'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { useDebounce } from '../../app/hooks/useDebounce'
import type { IEquipmentItem, ISearchArg } from '../../models/equipments'
import { useAddTermToHistoryMutation } from '../../store/api/equipment/equipments-api'
import { clearEquipmentSearch, setSearchTerm } from '../../store/equipments-slice'
import {
  selectEquipmentSearchFilters,
  selectEquipmentSearchTerm,
  selectIsAuth,
  selectLogin,
} from '../../store/selectors'

interface ISearch {
  list?: IEquipmentItem[] | undefined
  isLoading?: boolean
  isError?: boolean
  fetchEquipments?: (args: ISearchArg) => void
}

export function Search(props: ISearch) {
  const { list = [], isLoading = false, fetchEquipments, isError = false } = props

  const inputValue = useAppSelector(selectEquipmentSearchTerm)
  const filters = useAppSelector(selectEquipmentSearchFilters)
  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(selectIsAuth)
  const login = useAppSelector(selectLogin)

  const [add] = useAddTermToHistoryMutation()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      // event.preventDefault()
      dispatch(clearEquipmentSearch())
    }

    window.addEventListener('popstate', handleBackButton)

    return () => {
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [])

  // const debouncedValue = useDebounce(inputValue, SEARCH_DELAY)

  function navigateHelper() {
    if (location.pathname !== routes.search) {
      navigate(routes.search)
      return
    }
    if (fetchEquipments) {
      fetchEquipments({ login, filters, searchTerm: inputValue, page: PAGE, pageSize: PAGE_SIZE })
    }
    if (isAuth && inputValue) {
      add({ login, term: inputValue })
    }
  }

  function handleInputChange(
    e: SyntheticEvent<Element, Event>,
    inputValue: string,
    reason: AutocompleteInputChangeReason,
  ): void {
    dispatch(setSearchTerm(inputValue))
  }

  function handleSuggestChange(_e: SyntheticEvent, value: IEquipmentItem | null | string) {
    if (value && typeof value === 'object') {
      navigate('/' + value.id)
    }
  }

  function handleClick() {
    if (inputValue !== '' || filters) {
      navigateHelper()
      setIsDisabled(true)
    }
  }

  useEffect(() => {
    if (inputValue === '' && !filters) {
      navigate('/')
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [inputValue, filters])

  useEffect(() => {
    if (isError) {
      setIsDisabled(false)
    }
  }, [isError])

  useEffect(() => {
    if (inputValue || filters) {
      navigateHelper()
    }
    setIsDisabled(true)
  }, [])

  // useEffect(() => {
  //   if (debouncedValue) {
  //     navigateHelper(debouncedValue)
  //   }
  // }, [debouncedValue])

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      navigateHelper()
    }
  }

  // const isDisabled = useMemo(() => {
  //   return false
  // }, [filters, inputValue])

  const btnText = useMemo(() => {
    if (filters && inputValue !== '') {
      return 'Искать с фильтрами'
    } else if (filters && inputValue === '') {
      return 'Применить фильтры'
    } else {
      return 'Искать'
    }
  }, [filters, inputValue])

  return (
    <Stack spacing={2} direction="column" sx={{marginTop: {xs: "10px", md: "20px"}}}>
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
          disabled={isDisabled}
          variant={filters ? 'contained' : 'outlined'}
          sx={{ marginTop: '20px', height: '40px'}}
        >
          {btnText}
        </Button>
      </Stack>
      <EquipmentFilters />
    </Stack>
  )
}
