import { Troubleshoot } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import {
  InputLabel,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Select as MUISelect,
  FormControl,
} from '@mui/material'

interface IProps {
  handleChange(event: SelectChangeEvent): void
  options: string[]
  menuProps: any
  selectedList: string
  label: string
  name: string
}

export default function Select(props: IProps) {
  const { options, handleChange, menuProps, selectedList, label, name } = props
  return (
    <FormControl size="small" sx={{ width: '170px' }}>
      <InputLabel id={name}>{label}</InputLabel>
      <MUISelect
        autoWidth
        labelId={name}
        name={name}
        id={name}
        multiple
        value={selectedList}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={selected => selected}
        MenuProps={menuProps}
        variant="filled"
      >
        {options.map(el => (
          <MenuItem key={el} value={el} sx={{ width: 'auto' }}>
            <Checkbox checked={selectedList.includes(el)} />
            <ListItemText primary={el} primaryTypographyProps={{
    sx: { 
      fontSize: {xs: '0.8rem', md: "1rem"},
      whiteSpace: 'normal',  // Разрешаем перенос по словам
    wordWrap: 'break-word'
    }
  }}/>
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  )
}
