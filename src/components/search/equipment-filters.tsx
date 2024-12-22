import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import type { SelectChangeEvent } from '@mui/material'
import { Stack } from '@mui/material'

import Select from './select'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import type { IEquipmentFilter, IEquipmentFilterState } from '../../models/equipments'
import { useFetchFiltersQuery } from '../../store/api/equipment/equipments-api'
import { setSearchFilters } from '../../store/equipments-slice'
import { selectEquipmentSearchFilters } from '../../store/selectors'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export const type = typeof MenuProps

interface IProps {
  state: IEquipmentFilterState
  setState: React.Dispatch<React.SetStateAction<IEquipmentFilterState>>
}

export default function EquipmentFilters(props: IProps) {
  const { data: filters, isError, isSuccess } = useFetchFiltersQuery()
  const dispatch = useAppDispatch()
  const filterState = useAppSelector(selectEquipmentSearchFilters)

  const createInitState = useCallback(() => {
    const initState: IEquipmentFilterState = {}
    if (filters) {
      filters.forEach((el: IEquipmentFilter) => {
        if (!initState[el.name]) {
          initState[el.name] = []
        }
      })
    }
    return initState
  }, [filters])

  useEffect(() => {
    if (isSuccess) {
      const initState = createInitState()
      dispatch(setSearchFilters(initState))
    }
  }, [isSuccess])

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value, name },
    } = event
    const arr = typeof value === 'string' ? value.split(', ') : value
    setSearchFilters((prev: IEquipmentFilterState) => ({ ...prev, [name]: arr }))
    console.log(filterState)
  }

  function renderSelects() {
    if (!filters || filters?.length === 0) {
      return null
    }

    return (
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {filters.map((el: IEquipmentFilter) => {
          const { name, label, options } = el
          const selectedList = filterState[name]

          return (
            <Select
              key={name}
              name={name}
              options={options}
              handleChange={handleChange}
              menuProps={MenuProps}
              selectedList={selectedList}
              label={label}
            />
          )
        })}
      </Stack>
    )
  }

  return renderSelects()
}
