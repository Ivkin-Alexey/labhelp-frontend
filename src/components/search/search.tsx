import type { SyntheticEvent } from 'react'
import { useEffect, useLayoutEffect, useMemo, useState, useRef } from 'react'

import type { AutocompleteInputChangeReason, Theme } from '@mui/material'
import { SxProps, useMediaQuery } from '@mui/material'
import { Button, Stack, Typography } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import EquipmentFilters from './equipment-filters'
import SearchInput from './search-input'
import { PAGE, PAGE_SIZE, routes, SEARCH_DELAY } from '../../app/constants/constants'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { useDebounce } from '../../app/hooks/useDebounce'
import { decodeQueryParams, encodeQueryParams } from '../../app/utils/utils'
import type { IEquipmentItem, ISearchArg } from '../../models/equipments'
import { useAddTermToHistoryMutation } from '../../store/api/equipment/equipments-api'
import {
  clearEquipmentSearch,
  setSearchFilters,
  setSearchQueryParams,
  setSearchTerm,
} from '../../store/equipments-slice'
import {
  selectEquipmentSearchFilters,
  selectEquipmentSearchQueryParams,
  selectEquipmentSearchTerm,
  selectIsAuth,
  selectLogin,
  selectState,
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
  const location = useLocation()
  const path = location.pathname
  const [searchParams] = useSearchParams()
  const initialRender = useRef(true)
  const initialRequest = useRef(true)
  const secondlRequest = useRef(true)
  const isAuth = useAppSelector(selectIsAuth)
  const login = useAppSelector(selectLogin)
  const searchQueryParams = useAppSelector(selectEquipmentSearchQueryParams)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [isAnyFilterOpen, setIsAnyFilterOpen] = useState(false)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const debouncedValue = useDebounce(inputValue, SEARCH_DELAY)
  const navigate = useNavigate()

  function replaceUrl() {
    const params = {
      ...filters,
      ...(inputValue && { term: inputValue }),
    }
    const encodedParams = encodeQueryParams(params)
    // eslint-disable-next-line no-restricted-globals
    history.replaceState({}, '', encodedParams)
  }

  // Первый рендер. Который выполнится только на странице Search
  useLayoutEffect(() => {
    // Проверяем, если компонент вмонтирован не на странице Search прекращаем выполнение
    if (!fetchEquipments || path !== routes.search) {
      return
    }
    // Проверяем вставил ли пользователь ссылку в поле поиска или же он попал на страницу Search с главной страницы
    if (initialRender.current) {
      initialRender.current = false
      const searchParams = location.search
      const { term, filters: initialFilters } = decodeQueryParams(searchParams)

      if (term) {
        dispatch(setSearchTerm(term))
      }

      if (initialFilters != null) {
        dispatch(setSearchFilters(initialFilters))
      }
      // secondlRequest.current = false
      fetchEquipments({
        login,
        ...(initialFilters && { filters: initialFilters }),
        searchTerm: term,
        page: PAGE,
        pageSize: PAGE_SIZE,
      })
    }
  }, [])

  useLayoutEffect(() => {
    if (!fetchEquipments || path !== routes.search) {
      return
    }
    if (!inputValue && !filters) {
      return
    }
    fetchEquipments({
      login,
      ...(filters && { filters }),
      searchTerm: inputValue,
      page: PAGE,
      pageSize: PAGE_SIZE,
    })
  }, [])

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      dispatch(clearEquipmentSearch())
    }
    window.addEventListener('popstate', handleBackButton)
    return () => window.removeEventListener('popstate', handleBackButton)
  }, [])

  // Обработка запросов
  useEffect(() => {
    if (!fetchEquipments || path === routes.main) {
      return
    }
    if (!inputValue && !filters) {
      return
    }
    const abortController = new AbortController()
    if (initialRequest.current) {
      initialRequest.current = false
      return
    }
    if (secondlRequest.current) {
      secondlRequest.current = false
      return
    }
    fetchEquipments({
      login,
      ...(filters && { filters }),
      searchTerm: inputValue,
      page: PAGE,
      pageSize: PAGE_SIZE,
    })
    return () => {
      abortController.abort() // Отмена запроса при размонтировании
    }
  }, [debouncedValue, filters])

  // Обновление URL
  useLayoutEffect(() => {
    if ((debouncedValue || filters) && location.pathname === routes.main) {
      navigate(routes.search)
      replaceUrl()
      return
    }
    if (!filters && !inputValue && location.pathname === routes.search) {
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, '', location.pathname)
      return
    } else {
      replaceUrl()
    }
    // setIsDisabled(!inputValue && !filters)
  }, [debouncedValue, filters, navigate])

  const handleInputChange = (
    e: SyntheticEvent<Element, Event>,
    newValue: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    dispatch(setSearchTerm(newValue))
  }

  const showFilterButton = isMobile && isAnyFilterOpen

  return (
    <Stack spacing={2} direction="column" sx={{ marginTop: { xs: '10px', md: '20px' } }}>
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
        <SearchInput
          handleInputChange={handleInputChange}
          handleKeyDown={e =>
            e.key === 'Enter' &&
            fetchEquipments?.({
              login,
              filters,
              searchTerm: inputValue,
              page: PAGE,
              pageSize: PAGE_SIZE,
            })
          }
          list={list}
          isLoading={isLoading}
          inputValue={inputValue}
          value={null}
        />

        {showFilterButton && (
          <Button
            variant="contained"
            sx={{
              height: '35px',
              position: 'fixed',
              bottom: '10vh',
              zIndex: zIndex.modal + 1,
            }}
            onClick={() => setFiltersOpen(false)}
          >
            Применить
          </Button>
        )}
      </Stack>
      <EquipmentFilters />
    </Stack>
  )
}
