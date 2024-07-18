import type { SyntheticEvent } from 'react'
import { useEffect, useState } from 'react'

import type { AutocompleteInputChangeReason } from '@mui/material'
import { Button, Stack } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'

import SearchInput from './search-input'
import { SEARCH_DELAY } from '../../app/constants'
import { useDebounce } from '../../app/hooks/useDebounce'
import type { EquipmentItem } from '../../models/equipments'

interface ISearch {
  list?: EquipmentItem[] | undefined
  isLoading: boolean
}

export function Search(props: ISearch) {
  const { list = [], isLoading } = props

  const [searchParams] = useSearchParams()
  const term = searchParams.get('term')

  const [inputValue, setInputValue] = useState<string>(term || '')

  const debouncedValue = useDebounce(inputValue, SEARCH_DELAY)

  const navigate = useNavigate()

  function navigateHelper(term: string) {
    navigate('/search?term=' + term)
  }

  function handleInputChange(
    e: SyntheticEvent<Element, Event>,
    inputValue: string,
    reason: AutocompleteInputChangeReason,
  ): void {
    setInputValue(inputValue)
  }

  function handleSuggestChange(e: SyntheticEvent, value: EquipmentItem | null | string) {
    // TODO: implement routing to equipment page
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
    <Stack spacing={2} direction="row">
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
  )
}
