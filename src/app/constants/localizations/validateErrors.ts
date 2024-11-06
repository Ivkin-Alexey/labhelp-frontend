import { LOGIN_SPECIAL_CHARACTERS, PASSWORD_SPECIAL_CHARACTERS } from "../constants";

const validateErrorMessages = {
    emptyError: "Введите значение",
    cyrillicError: "Допустима только кириллица",
    spaceBetweenWordsOnlyError: "Пробелы допустимы только между словами",
    maxLengthError: "Превышена максимальная длина значения",
    minLengthError: "Длина значения меньше требуемого",
    incorrectLogin: `Логин может содержать только латинские буквы, цифры и символы ${LOGIN_SPECIAL_CHARACTERS}, должен начинаться только с буквы или цифры`,
    incorrectPassword: `Пароль может содержать только латинские буквы, цифры и символы ${PASSWORD_SPECIAL_CHARACTERS}`
}

export default validateErrorMessages;