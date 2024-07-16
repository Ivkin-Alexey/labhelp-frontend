import * as React from 'react'
import { useEffect, useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import type { EquipmentItem } from '../../models/equipments'

interface ISearchInput {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void
  list: EquipmentItem[]
}

export default function SearchInput(props: ISearchInput) {
  const { handleChange, handleKeyDown, list } = props
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<EquipmentItem[]>([])
  const loading = open && options.length === 0

  function createLabel(equipment: EquipmentItem) {
    return equipment.name + ' ' + equipment.model + ' (зав. № ' + equipment.id + ')'
  }

  function handleSuggestChange(_: React.SyntheticEvent, value: EquipmentItem | null) {
      console.log(value?.id)
  }

  useEffect(() => {
    if (!loading) {
      return
    }

    setOptions(list)
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={option => createLabel(option)}
      noOptionsText="Оборудование не найдено"
      options={options}
      loading={loading}
      onChange={handleSuggestChange}
      renderInput={params => (
        <TextField
          {...params}
          label="Оборудование"
          variant="outlined"
          sx={{ width: '50vw' }}
          autoFocus={true}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
