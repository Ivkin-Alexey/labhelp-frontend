import type { SelectChangeEvent, Theme } from '@mui/material'
import { Stack, useMediaQuery } from '@mui/material'

import Select from './select'
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks'
import { checkIsFiltered } from '../../app/utils/utils'
import type { IEquipmentFilter } from '../../models/equipments'
import { useFetchFiltersQuery } from '../../store/api/equipment/equipments-api'
import { setSearchFilters } from '../../store/equipments-slice'
import { selectEquipmentSearchFilters } from '../../store/selectors'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
    },
  },
  disableScrollLock: true,
}

export const type = typeof MenuProps

export default function EquipmentFilters() {
  const { data: filters, isError, isSuccess } = useFetchFiltersQuery()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))
  const dispatch = useAppDispatch()
  const filterState = useAppSelector(selectEquipmentSearchFilters)

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value, name },
    } = event
    const arr = typeof value === 'string' ? value.split(', ') : value

    let changedFilters
    if (!filterState) {
      changedFilters = {
        [name]: arr,
      }
    } else {
      changedFilters = { ...filterState, [name]: arr }
      if (arr.length === 0) {
        delete changedFilters[name]
      }
    }

    const isFiltered = checkIsFiltered(changedFilters)
    if (!isFiltered) {
      dispatch(setSearchFilters(null))
    } else {
      dispatch(setSearchFilters(changedFilters))
    }
  }

  function renderSelects() {
    if (!filters || filters?.length === 0) {
      return null
    }

    return (
      <Stack
        direction="row"
        useFlexGap
        style={{marginTop: isMobile ? "6px" : "12px"}}
        sx={{ flexWrap: 'wrap', marginBottom: "6px", justifyContent: 'center', gap: {xs: "1vw", sm: "16px" }}}
      >
        {filters.map((el: IEquipmentFilter) => {
          const { name, label, options } = el
          const selectedList = filterState && filterState[name] ? filterState[name] : []

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
