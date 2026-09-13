import type { SyntheticEvent } from 'react'
import { useEffect, useLayoutEffect, useState, useRef } from 'react'

import type { AutocompleteInputChangeReason, Theme } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { Button, Stack } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import { useLocation, useNavigate } from 'react-router-dom'

import EquipmentFilters from './equipment-filters'
import SearchInput from './search-input'
import { PAGE, PAGE_SIZE, routes, SEARCH_DELAY } from '../../app/constants/constants'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { useDebounce } from '../../app/hooks/useDebounce'
import { decodeQueryParams, encodeQueryParams } from '../../app/utils/utils'
import type { IEquipmentItem, ISearchArg } from '../../models/equipments'
import { useFetchEquipmentsCountQuery } from '../../store/api/equipment/equipments-api'
import { clearEquipmentSearch, setSearchFilters, setSearchTerm } from '../../store/equipments-slice'
import {
  selectEquipmentSearchFilters,
  selectEquipmentSearchTerm,
  selectLogin,
  selectSearchResultPage,
} from '../../store/selectors'

interface ISearch {
  list?: IEquipmentItem[] | undefined
  isLoading?: boolean
  isError?: boolean
  fetchEquipments?: (args: ISearchArg) => void
  showTotalCount?: boolean
}

export function Search(props: ISearch) {
  const { list = [], isLoading = false, fetchEquipments, showTotalCount = false } = props

  const inputValue = useAppSelector(selectEquipmentSearchTerm)
  const filters = useAppSelector(selectEquipmentSearchFilters)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const path = location.pathname
  const initialRender = useRef(true)
  const initialRequest = useRef(true)
  const secondlRequest = useRef(true)
  const login = useAppSelector(selectLogin)
  const savedPage = useAppSelector(selectSearchResultPage)
  const [, setFiltersOpen] = useState(false)
  const [isAnyFilterOpen] = useState(false)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const debouncedValue = useDebounce(inputValue, SEARCH_DELAY)
  const navigate = useNavigate()

  // Получаем общее количество оборудования
  const { data: totalCountData, isLoading: isCountLoading } = useFetchEquipmentsCountQuery(
    undefined,
    { skip: !showTotalCount },
  )

  function replaceUrl() {
    const params = {
      ...filters,
      ...(inputValue?.trim() && { term: inputValue.trim() }),
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
        dispatch(setSearchTerm(term.trim()))
      }
      if (initialFilters != null) {
        dispatch(setSearchFilters(initialFilters))
      }
      // secondlRequest.current = false
      // Делаем запрос только если есть поисковый термин или фильтры
      if (term?.trim() || initialFilters) {
        fetchEquipments({
          login,
          ...(initialFilters && { filters: initialFilters }),
          searchTerm: term.trim(),
          page: PAGE,
          pageSize: PAGE_SIZE,
        })
      }
    }
    // Инициализация только на первом рендере страницы поиска
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    if (!fetchEquipments || path !== routes.search) {
      return
    }
    if (!inputValue && !filters) {
      return
    }
    // Не делаем запрос если поисковый термин пустой или содержит только пробелы
    if (inputValue && !inputValue.trim()) {
      return
    }
    fetchEquipments({
      login,
      ...(filters && { filters }),
      searchTerm: inputValue.trim(),
      page: savedPage || PAGE,
      pageSize: PAGE_SIZE,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      dispatch(clearEquipmentSearch())
    }
    window.addEventListener('popstate', handleBackButton)
    return () => window.removeEventListener('popstate', handleBackButton)
  }, [dispatch])

  // Обработка запросов
  useEffect(() => {
    if (!fetchEquipments || path === routes.main) {
      return
    }
    if (!inputValue && !filters) {
      return
    }
    // Не делаем запрос если поисковый термин пустой или содержит только пробелы
    if (inputValue && !inputValue.trim()) {
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
      searchTerm: inputValue.trim(),
      page: PAGE,
      pageSize: PAGE_SIZE,
    })
    return () => {
      abortController.abort() // Отмена запроса при размонтировании
    }
    // Реагируем только на debounced-значение и фильтры: зависимостями от
    // inputValue/login/path запросы вызывались бы на каждое нажатие клавиши
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, filters])

  // Обновление URL
  useLayoutEffect(() => {
    if ((debouncedValue?.trim() || filters) && location.pathname === routes.main) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            inputValue?.trim() &&
            fetchEquipments?.({
              login,
              filters,
              searchTerm: inputValue.trim(),
              page: PAGE,
              pageSize: PAGE_SIZE,
            })
          }
          list={list}
          isLoading={isLoading}
          inputValue={inputValue}
          value={null}
          totalEquipmentUnits={totalCountData?.count}
          isCountLoading={isCountLoading}
          showTotalCount={showTotalCount}
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
