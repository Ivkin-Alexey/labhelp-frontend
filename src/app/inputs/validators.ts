import validateErrorMessages from "../constants/localizations/validateErrors";
import {capitalize} from "../methods/methods";
import type {TValidateRule, TValidateRules} from "../../models/inputs"
const cyrillicWithSpaceRegExp = /[^а-яёА-ЯЁ ]/gi;
const cyrillicRegExp = /[^а-яёА-ЯЁ]/gi;
const userIDRegExp = /^[0-9A-Za-z]$/;
const passwordRegExp = /^(?=.*?[0-9])(?=.*?[A-Za-z]).$/

const phoneRegExp = /\D+/g;
const requiredPhoneCharacter = "+";
const onlySingleWhiteSpacesRegExp = /\s{2,}/g;

const {
    emptyError,
    spaceBetweenWordsOnlyError,
    minLengthError,
    incorrectLogin,
    incorrectPassword
} = validateErrorMessages;

export default function validateInputValue(value: string = "", rules: TValidateRules, required: boolean) {

    type TValidateResult = {value: string, isValid: boolean, errorText: string}

    type TValidateCallback = (length: number) => void

    let result: TValidateResult = {value, isValid: true, errorText: ""};

    type TvalidateRules = {[key: string]: TValidateCallback | (() => void)}

    const validateRules: TvalidateRules = {
        cyrillicTextOnly: () => checkIsCyrillicOnly(),
        spaceBetweenWordsOnly: () => checkIsSpaceBetweenWords(),
        phone: () => checkIsPhone(),
        login: () => checkIsLoginCorrect(),
        password: () => checkIsPasswordCorrect(),
        maxLength: (lenght: number) => checkIsMaxLengthCorrect(lenght),
        minLength: (lenght: number) => checkIsMinLengthCorrect(lenght),
    }

    executePreCheck();

    rules.forEach(rule => {
        if (typeof rule === "string") validateRules[rule]();
        else {
            const [[key, value]] = Object.entries(rule)
            validateRules[key](value)
        }
    })

    executeDefaultCheck();

    return result;

    function executePreCheck() {
        value = value?.trimStart();
        if (value === "" && required === true) {
            result.isValid = false;
            result.errorText = emptyError;
        }
    }

    function executeDefaultCheck() {
        if (value === "" && required === true) {
            result.isValid = false;
            result.errorText = emptyError;
        }
        if (!rules?.includes("spaceBetweenWordsOnly")) {
            value = capitalize(value.toLowerCase());
        }
        result.value = value;
    }

    function checkIsCyrillicOnly() {
        if (rules?.includes("spaceBetweenWordsOnly")) value = value?.replace(cyrillicWithSpaceRegExp, "");
        else value = value.replace(cyrillicRegExp, "");
    }

    function checkIsSpaceBetweenWords() {
        value = value.replace(onlySingleWhiteSpacesRegExp, ' ');
        const end = value[value.length - 1];
        if (end === " ") {
            result.isValid = false;
            result.errorText = spaceBetweenWordsOnlyError;
        }
    }

    function checkIsPhone() {
        value = requiredPhoneCharacter + value.replace(phoneRegExp, "");
        if(value === requiredPhoneCharacter) {
            result.isValid = false;
            result.errorText = emptyError;
        }
    }

    function checkIsMaxLengthCorrect(length: number) {
        if (value.length > length) {
            value = value.substr(0, length);
        }
    }

    function checkIsMinLengthCorrect(length: number) {
        if (value.length < length) {
            result.isValid = false;
            result.errorText = minLengthError;
        }
    }

    function checkIsLoginCorrect() {
            result.isValid = userIDRegExp.test(value);
            if(!result.isValid) {
                result.errorText = incorrectLogin;
            }
    }

    function checkIsPasswordCorrect() {
        result.isValid = passwordRegExp.test(value);
        if(!result.isValid) {
            result.errorText = incorrectPassword;
        }
}
}