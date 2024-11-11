import validateErrorMessages from '../constants/localizations/validateErrors'
import { capitalize } from '../methods/methods'
import type {
  TValidateCallback,
  TValidateResult,
  TValidateRule,
  TValidateRules,
} from '../../models/inputs'
import { LOGIN_SPECIAL_CHARACTERS } from '../constants/constants'
const cyrillicWithSpaceRegExp = /[^а-яёА-ЯЁ ]/gi
const cyrillicRegExp = /[^а-яёА-ЯЁ]/gi
const userIdRegExp = /^[a-zA-Z0-9][a-zA-Z0-9-_@]*$/
const passwordRegExp = new RegExp('^[A-Za-z\\d' + LOGIN_SPECIAL_CHARACTERS + ']*$')

const phoneRegExp = /\D+/g
const requiredPhoneCharacter = '+'
const onlySingleWhiteSpacesRegExp = /\s{2,}/g

const {
  emptyError,
  spaceBetweenWordsOnlyError,
  minLengthError,
  incorrectLogin,
  incorrectPassword,
} = validateErrorMessages

interface IValidateRulesObj {
  [key: string]: () => void
}

interface IValidateLengthObj {
  maxLength: (length: number) => void
  minLength: (length: number) => void
}

export default function validateInputValue(
  value: string = '',
  rules: TValidateRules,
  required: boolean,
): TValidateResult {
  let result: TValidateResult = { value, isValid: true, errorText: '' }
  const validateRules: IValidateRulesObj = {
    cyrillicTextOnly: () => checkIsCyrillicOnly(),
    spaceBetweenWordsOnly: () => checkIsSpaceBetweenWords(),
    phone: () => checkIsPhone(),
    login: () => checkIsLoginCorrect(),
    password: () => checkIsPasswordCorrect(),
  }
  const validateLength: IValidateLengthObj = {
    maxLength: lenght => checkIsMaxLengthCorrect(lenght),
    minLength: lenght => checkIsMinLengthCorrect(lenght),
  }

  function validate(rule: TValidateRule) {
    if (typeof rule === 'object') {
      const [[key, value]] = Object.entries(rule)
      validateLength[key as keyof IValidateLengthObj](value)
    } else {
      validateRules[rule]()
    }
  }

  executePreCheck()

  rules.forEach(rule => validate(rule))

  executeDefaultCheck()

  return result

  function executePreCheck() {
    value = value?.trimStart()
    if (value === '' && required === true) {
      result.isValid = false
      result.errorText = emptyError
    }
  }

  function executeDefaultCheck() {
    if (value === '' && required === true) {
      result.isValid = false
      result.errorText = emptyError
    }
    if (!rules?.includes('spaceBetweenWordsOnly')) {
      value = capitalize(value.toLowerCase())
    }
    result.value = value
  }

  function checkIsCyrillicOnly() {
    if (rules?.includes('spaceBetweenWordsOnly'))
      value = value?.replace(cyrillicWithSpaceRegExp, '')
    else value = value.replace(cyrillicRegExp, '')
  }

  function checkIsSpaceBetweenWords() {
    value = value.replace(onlySingleWhiteSpacesRegExp, ' ')
    const end = value[value.length - 1]
    if (end === ' ') {
      result.isValid = false
      result.errorText = spaceBetweenWordsOnlyError
    }
  }

  function checkIsPhone() {
    value = requiredPhoneCharacter + value.replace(phoneRegExp, '')
    if (value === requiredPhoneCharacter) {
      result.isValid = false
      result.errorText = emptyError
    }
  }

  function checkIsMaxLengthCorrect(length: number) {
    if (value.length > length) {
      value = value.substr(0, length)
    }
  }

  function checkIsMinLengthCorrect(length: number) {
    if (value.length < length) {
      result.isValid = false
      result.errorText = minLengthError
    }
  }

  function checkIsLoginCorrect() {
    result.isValid = userIdRegExp.test(value)
    if (!result.isValid) {
      result.errorText = incorrectLogin
    }
  }

  function checkIsPasswordCorrect() {
    result.isValid = passwordRegExp.test(value)
    if (!result.isValid) {
      result.errorText = incorrectPassword
    }
  }
}
