import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { MenuItem, Stack, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import ListSubheader from '@mui/material/ListSubheader'

import { useAppSelector } from '../../app/hooks/hooks'
import inputsSettings from '../../app/inputs/inputs'
import validateInputValue from '../../app/inputs/validators'
import type {
  IInputSettings,
  TInputArray,
  IStudentCategoryFilteringRule,
  TInputValue,
  IFormValues,
} from '../../models/inputs'
import type { IUserForm } from '../../models/users'
import { selectLogin } from '../../store/selectors'

interface IFormProps {
  inputList: TInputArray
  defaultInputValues?: IUserForm
  filteringRules: { [key: string]: IStudentCategoryFilteringRule[] }
  onSendData: (formData: IFormValues) => void
  confirmMessage?: string
  btnText?: string
  header?: string
  disabledInputs?: TInputArray
  optionalButtons?: React.ReactNode | undefined
}

interface IFormState {
  [key: string]: IInputState
}

interface IInputState {
  required: boolean
  validateRules: string[]
  value: IUserForm[keyof IUserForm]
  isValid: boolean
  errorText: string
}

const Form = (props: IFormProps) => {
  const {
    inputList: inputLabelList,
    defaultInputValues,
    filteringRules,
    confirmMessage,
    onSendData: onSend,
    btnText = 'Отправить',
    header,
    optionalButtons,
    disabledInputs
  } = props

  const accountLogin = useAppSelector(selectLogin)

  const defaultFormState: IFormState = useMemo(
    () =>
      inputLabelList.reduce((acc, cur) => {
        let inputSettings: IInputSettings = inputsSettings[cur]

        const { required, initValue, validateRules } = inputSettings
        let value: TInputValue
        if (defaultInputValues) {
          value = defaultInputValues[cur as keyof IUserForm]
        } else {
          value = initValue
        }

        return {
          ...acc,
          [cur]: {
            required,
            validateRules,
            ...validateInputValue(value, validateRules, required),
          },
        }
      }, {}),
    [],
  )

  // В formState хранится состояние формы, необходимое для ее валидации, а также отправки данных на сервер.
  // В textInputs хранятся параметры для разметки
  const [formState, setFormState] = useState<IFormState>(defaultFormState)
  const [textInputs, setTextInputs] = useState(filterInputs())
  const [isDisabled, setIsDisabled] = useState(true)

  const formValues = useMemo(() => {
    const formValues: IFormValues = {}
    for (let key in formState) {
        formValues[key] = formState[key].value
      }
    return formValues

  }, [formState])

  const onSendData = useCallback(() => {

    onSend(formValues)
  }, [formState])

  // function popupCallback() {
  //     if(accountData.role === "superAdmin") navigate(-1);
  //     else tg.close()
  // }

  useEffect(() => {
    if (validateFormData()) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
    setTextInputs(() => filterInputs())
    setFormState(() => formState)
  }, [formState])

  const onChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target
    value = value ? value[0].toUpperCase() + value.slice(1) : ''
    setFormState(state => {
      const inputState: IInputState = state[name as keyof IFormState]

      return {
        ...state,
        [name as keyof IFormState]: {
          ...inputState,
          ...validateInputValue(value, inputState.validateRules, inputState.required),
        },
      }
    })
  }

  function filterInputs() {
    let hiddenInputs: string[] = []
    for (let rule in filteringRules) {
      const arr = filteringRules[rule]
      const obj = arr.find(el => el.inputValue === formState[rule]?.value)
      if (obj) {hiddenInputs = [...hiddenInputs, ...obj.hiddenFormFields]}
    }
    return inputLabelList.filter(el => !hiddenInputs.includes(el))
  }

  function validateFormData() {
    return Object.values(formState).find(el => el.isValid === false)
  }

  function renderSelectOptions(options: string[]) {
    return options.map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))
  }

  function renderTextFields() {
    return textInputs.map((el, i) => {
      const { value, isValid, errorText } = formState[el as keyof IFormState]
      const { selectOptions, id, label, select, required } = inputsSettings[el]
      return (
        <TextField
          disabled={disabledInputs?.includes(el)}
          error={!isValid}
          required={required}
          name={el}
          helperText={errorText}
          key={i}
          onChange={onChangeData}
          fullWidth
          value={value}
          id={id}
          label={label}
          select={select}
        >
          {selectOptions && renderSelectOptions(selectOptions)}
        </TextField>
      )
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter') {
      onSendData()
    }
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      width={'350px'}
      marginBottom={'50px'}
      component="form"
      noValidate
      autoComplete="off"
      onKeyDown={handleKeyDown}
    >
      {header && <ListSubheader component="div">{header}</ListSubheader>}
      {renderTextFields()}
      <Button variant="contained" disabled={isDisabled} onClick={onSendData}>
        {btnText}
      </Button>
      {optionalButtons ?? null}
    </Stack>
  )
}

export default Form
