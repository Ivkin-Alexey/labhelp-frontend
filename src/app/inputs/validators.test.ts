import validateInputValue from './validators'
import validateErrorMessages from '../constants/localizations/validateErrors'

const {
  emptyError,
  spaceBetweenWordsOnlyError,
  minLengthError,
  incorrectLogin,
  incorrectPassword,
} = validateErrorMessages

describe('validateInputValue', () => {
  it('помечает пустое обязательное значение как невалидное', () => {
    expect(validateInputValue('', ['cyrillicTextOnly'], true)).toEqual({
      value: '',
      isValid: false,
      errorText: emptyError,
    })
  })

  it('пропускает пустое необязательное значение', () => {
    expect(validateInputValue('', ['cyrillicTextOnly'], false)).toEqual({
      value: '',
      isValid: true,
      errorText: '',
    })
  })

  it('убирает пробелы в начале значения', () => {
    expect(validateInputValue('  иван', ['cyrillicTextOnly'], false).value).toBe('Иван')
  })

  it('оставляет только кириллицу', () => {
    expect(validateInputValue('иван3abc', ['cyrillicTextOnly'], false)).toEqual({
      value: 'Иван',
      isValid: true,
      errorText: '',
    })
  })

  it('оставляет кириллицу и одиночные пробелы между словами', () => {
    const result = validateInputValue(
      'иван   3 иван',
      ['cyrillicTextOnly', 'spaceBetweenWordsOnly'],
      false,
    )

    expect(result).toEqual({ value: 'иван иван', isValid: true, errorText: '' })
  })

  it('помечает значение с пробелом на конце как невалидное', () => {
    expect(validateInputValue('иван ', ['spaceBetweenWordsOnly'], false)).toEqual({
      value: 'иван ',
      isValid: false,
      errorText: spaceBetweenWordsOnlyError,
    })
  })

  it('форматирует номер телефона', () => {
    expect(validateInputValue('8 (999) 123-45-67', ['phone'], false)).toEqual({
      value: '+89991234567',
      isValid: true,
      errorText: '',
    })
  })

  it('помечает телефон без цифр как невалидное', () => {
    expect(validateInputValue('abc', ['phone'], false)).toEqual({
      value: '+',
      isValid: false,
      errorText: emptyError,
    })
  })

  it('обрезает значение длиннее максимальной длины', () => {
    expect(validateInputValue('абвгде', [{ maxLength: 3 }], false)).toEqual({
      value: 'Абв',
      isValid: true,
      errorText: '',
    })
  })

  it('помечает значение короче минимальной длины как невалидное', () => {
    expect(validateInputValue('аб', [{ minLength: 3 }], false)).toEqual({
      value: 'Аб',
      isValid: false,
      errorText: minLengthError,
    })
  })

  it('пропускает корректный логин', () => {
    expect(validateInputValue('user-1@A', ['login'], false)).toEqual({
      value: 'user-1@A',
      isValid: true,
      errorText: '',
    })
  })

  it('не меняет регистр логина', () => {
    expect(validateInputValue('user', ['login'], false).value).toBe('user')
  })

  it('помечает логин с запрещенными символами как невалидное', () => {
    expect(validateInputValue('user name', ['login'], false)).toEqual({
      value: 'user name',
      isValid: false,
      errorText: incorrectLogin,
    })
  })

  it('пропускает корректный пароль', () => {
    expect(validateInputValue('pass-1@A', ['password'], false)).toEqual({
      value: 'pass-1@A',
      isValid: true,
      errorText: '',
    })
  })

  it('помечает пароль с пробелом как невалидное', () => {
    expect(validateInputValue('pass word', ['password'], false)).toEqual({
      value: 'pass word',
      isValid: false,
      errorText: incorrectPassword,
    })
  })
})
