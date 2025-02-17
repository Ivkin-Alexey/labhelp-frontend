import { useState, type SyntheticEvent } from 'react'
import * as React from 'react'

import type {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from '@mui/material/Autocomplete'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import type { IEquipmentItem } from '../../models/equipments'

interface ISearchInput {
  handleInputChange(
    e: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ): void
  handleChange(
    e: SyntheticEvent<Element, Event>,
    value: IEquipmentItem | null | string,
    reason: AutocompleteChangeReason,
  ): void
  handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void
  list: IEquipmentItem[]
  isLoading: boolean
  inputValue: string
  value: IEquipmentItem | null
}

export default function SearchInput(props: ISearchInput) {
  const { handleInputChange, handleChange, handleKeyDown, list, isLoading, inputValue, value } =
    props

  const [isOpen, setIsOpen] = useState(!!inputValue)

  function createLabel(equipment: IEquipmentItem | string) {
    if (typeof equipment === 'string') {
      return equipment
    }
    return equipment.name + ' ' + equipment.model + ' (зав. № ' + equipment.id + ')'
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
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onInputChange={handleInputChange}
      filterOptions={x => x}
      value={value}
      inputValue={inputValue}
      renderInput={params => (
        <TextField
          {...params}
          label="Поиск оборудования"
          variant="outlined"
          sx={{ width: {xs: '90vw', md: "60vw"} }}
          autoFocus={true}
          onKeyDown={handleKeyDown}
          size="small"
          InputProps={{
            ...params.InputProps,
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
