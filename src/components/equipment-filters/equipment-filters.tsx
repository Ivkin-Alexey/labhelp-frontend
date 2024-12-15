import React, { useCallback, useEffect, useState } from 'react'

import type { SelectChangeEvent } from '@mui/material'
import { FormControl, Stack } from '@mui/material'

import Select from './select'
import type {
  IEquipmentFilter,
  IEquipmentFilterState,
  TEquipmentFilters,
} from '../../models/equipments'
import { useFetchFiltersQuery } from '../../store/api/equipment/equipments-api'

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

export default function EquipmentFilters() {
  const { data: filters, isError, isSuccess } = useFetchFiltersQuery()

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

  const [state, setState] = useState<IEquipmentFilterState>({})

  const queryParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(state)) {
    queryParams.append(key, JSON.stringify(value));
  }
  
  const url = `/api/endpoint?${queryParams.toString()}`;
  

  useEffect(() => {
    if (isSuccess) {
      const initState = createInitState()
      setState(initState)
    }
  }, [isSuccess])

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value, name },
    } = event
    const arr = typeof value === 'string' ? value.split(', ') : value
    setState((prev: IEquipmentFilterState) => ({ ...prev, [name]: arr }))
  }

  function renderSelects() {
    if (!filters || filters?.length === 0 || Object.keys(state).length === 0) {
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
          const selectedList = state[name]

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
