import type React from 'react'
import { useEffect, useMemo, useState } from 'react'

import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import ListSubheader from '@mui/material/ListSubheader'

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

interface IFormProps {
  inputList: TInputArray
  defaultInputValues?: IUserForm
  filteringRules: { [key: string]: IStudentCategoryFilteringRule[] }
  onSendData: (formData: IFormValues) => void
  isLoading?: boolean
  confirmMessage?: string
  btnText?: string
  header?: string
  disabledInputs?: TInputArray
  optionalButtons?: React.ReactNode | undefined
  // Текст второй кнопки: отправляет только изменённые поля через onSendData,
  // неактивна, пока поля не меняли
  secondBtnText?: string
  // Если задано, главная кнопка вызывает это действие вместо отправки формы
  onMainBtnClick?: (formData: IFormValues) => void
  // Если задано, вторая кнопка вызывает это действие вместо отправки формы
  onSecondBtnClick?: (formData: IFormValues) => void
  // Главная кнопка неактивна, пока поля не изменены (для форм редактирования)
  requireChange?: boolean
  // Контрол подтверждения пользователя: отображается над полями формы,
  // переключение сразу вызывает onVerifiedChange (PATCH уходит с isVerified)
  isVerified?: boolean
  onVerifiedChange?: (isVerified: boolean) => void
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
    onSendData,
    isLoading = false,
    btnText = 'Отправить',
    header,
    optionalButtons,
    disabledInputs,
    secondBtnText,
    onMainBtnClick,
    onSecondBtnClick,
    requireChange = false,
    isVerified,
    onVerifiedChange,
  } = props

  const defaultFormState: IFormState = useMemo(
    () =>
      inputLabelList.reduce((acc, cur) => {
        let inputSettings: IInputSettings = inputsSettings[cur]

        const { required, initValue, validateRules } = inputSettings
        let value: TInputValue
        if (defaultInputValues && defaultInputValues[cur as keyof IUserForm]) {
          value = defaultInputValues[cur as keyof IUserForm]
        } else {
          value = initValue ?? ''
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
    [inputLabelList, defaultInputValues],
  )

  // В formState хранится состояние формы, необходимое для ее валидации, а также отправки данных на сервер.
  // В textInputs хранятся только имена инпутом для разметки
  const [formState, setFormState] = useState<IFormState>(defaultFormState)
  const [textInputs, setTextInputs] = useState(filterInputs())
  const [isDisabled, setIsDisabled] = useState(true)

  function getFormValues() {
    const trimmedFormState = trimFormState()
    const formValues: IFormValues = {}
    for (let key in trimmedFormState) {
      formValues[key] = trimmedFormState[key].value
    }
    return formValues
  }

  // filterInputs/validateFormData пересоздаются на каждый рендер, а их добавление
  // в зависимости запускает бесконечный цикл рендеров — эффект нужен только при изменении формы
  useEffect(() => {
    if (validateFormData()) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
    setTextInputs(() => filterInputs())
    setFormState(() => formState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function trimFormState() {
    const trimmedFormState = Object.assign({}, formState)
    for (let key in trimmedFormState) {
      if (!textInputs.includes(key)) {
        delete trimmedFormState[key]
      }
    }
    return trimmedFormState
  }

  function filterInputs() {
    let hiddenInputs: string[] = []
    for (let rule in filteringRules) {
      const arr = filteringRules[rule]
      const obj = arr.find(el => el.inputValue === formState[rule]?.value)
      if (obj) {
        hiddenInputs = [...hiddenInputs, ...obj.hiddenFormFields]
      }
    }
    return inputLabelList.filter(el => !hiddenInputs.includes(el))
  }

  function validateFormData() {
    const trimmedFormState = trimFormState()
    return Object.values(trimmedFormState).find(el => el.isValid === false)
  }

  // Отправляем только изменённые поля: сервер применяет PATCH как есть, и
  // нечего перезаписывать неизменившиеся значения (а пароль и вовсе не трогаем)
  function getChangedFormValues(): IFormValues {
    const formValues = getFormValues()
    const changedValues: IFormValues = {}
    for (const key in formValues) {
      if (formValues[key] !== defaultFormState[key]?.value) {
        changedValues[key] = formValues[key]
      }
    }
    return changedValues
  }

  const isFormChanged = Object.keys(getChangedFormValues()).length > 0

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
      onSendData(getFormValues())
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
      {onVerifiedChange && (
        <FormControlLabel
          control={
            <Switch
              checked={Boolean(isVerified)}
              onChange={(_, checked) => {
                // Клик игнорируем, пока идёт любой PATCH, но свитч не
                // затемняем: disabled на время «Сохранить» выглядел как
                // мерцание (тускнеет и светлеет после ответа сервера)
                if (!isLoading) {
                  onVerifiedChange(checked)
                }
              }}
              color="success"
            />
          }
          label={isVerified ? 'Подтверждён' : 'Не подтверждён'}
        />
      )}
      {renderTextFields()}
      {secondBtnText && (
        <Button
          variant="outlined"
          disabled={!isFormChanged || isLoading}
          onClick={() =>
            onSecondBtnClick ? onSecondBtnClick(getChangedFormValues()) : onSendData(getChangedFormValues())
          }
        >
          {secondBtnText}
        </Button>
      )}
      <Button
        variant="contained"
        disabled={(requireChange && !isFormChanged) || isDisabled || isLoading}
        onClick={() =>
          onMainBtnClick ? onMainBtnClick(getFormValues()) : onSendData(getFormValues())
        }
      >
        {btnText}
      </Button>
      {optionalButtons ?? null}
    </Stack>
  )
}

export default Form
