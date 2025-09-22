import { useState, type SyntheticEvent } from 'react'
import * as React from 'react'

import type {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import type { IEquipmentItem } from '../../models/equipments'
import { InputAdornment } from '@mui/material'

interface ISearchInput {
  handleInputChange(
    e: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ): void
  // handleChange(
  //   e: SyntheticEvent<Element, Event>,
  //   value: IEquipmentItem | null | string,
  //   reason: AutocompleteChangeReason,
  // ): void
  handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void
  list: IEquipmentItem[]
  isLoading: boolean
  inputValue: string
  value: IEquipmentItem | null
  totalEquipmentUnits?: number
  isCountLoading?: boolean
  showTotalCount?: boolean
}

export default function SearchInput(props: ISearchInput) {
  const { handleInputChange, handleKeyDown, list, isLoading, inputValue, value, totalEquipmentUnits, isCountLoading, showTotalCount } =
    props

  const [isOpen, setIsOpen] = useState(!!inputValue)

  function createLabel(equipment: IEquipmentItem | string) {
    if (typeof equipment === 'string') {
      return equipment
    }
    return equipment.name + ' ' + equipment.model + ' (зав. № ' + equipment.id + ')'
  }

  function getPlaceholder() {
    if (showTotalCount && totalEquipmentUnits !== undefined && !isCountLoading) {
      // Правильное склонение слова "единиц"
      const lastDigit = totalEquipmentUnits % 10
      const secondLastDigit = Math.floor((totalEquipmentUnits % 100) / 10)
      
      let unitsWord = ''
      // Если последняя цифра 1, а предпоследняя НЕ 1, то добавляем "ы"
      if (lastDigit === 1 && secondLastDigit !== 1) {
        unitsWord = 'ы'
      }
      
      return `Искать среди ${totalEquipmentUnits} единиц${unitsWord} оборудования`
    }
    if (showTotalCount && isCountLoading) {
      return 'Загрузка...'
    }
    return 'Поиск оборудования'
  }

  function handleBlur() {
    setIsOpen(false)
  }

  function handleFocus() {
    setIsOpen(true)
  }

  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={value => createLabel(value)}
      freeSolo
      noOptionsText="Оборудование не найдено"
      open={isOpen}
      options={list}
      loading={isLoading}
      // onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onInputChange={handleInputChange}
      filterOptions={x => x}
      value={value}
      inputValue={inputValue}
      renderInput={params => (
        <TextField
          {...params}
          // label="Поиск оборудования"
          variant="outlined"
          sx={{ width: {xs: '89vw', sm: "40vw"} }}
          autoFocus={true}
          onKeyDown={handleKeyDown}
          size="small"
          placeholder={getPlaceholder()}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
