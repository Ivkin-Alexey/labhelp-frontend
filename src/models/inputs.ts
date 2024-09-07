export type IStudentCategoryLabel = "Студент" | "Аспирант" | "Сотрудник"

export type IStudentCategory = "postGraduateEducationYear" | "studentsEducationYear" | "position"

export interface IStudentCategoryFilteringRule {
    inputValue: string; 
    hiddenFormFields: string[]
}

export type TInputValue = string

export type TInputLabel = string

export type TValidateRules = Array<TValidateRule>

export type TValidateRule = string | { minLength: number} | {maxLength: number}

export type TInputArray = string[]

export type TValidateResult = {value: string, isValid: boolean, errorText: string}

export type TValidateCallback = (length: number) => void

export interface IInputSettings {
    label: string,
    id: string,
    required: boolean,
    initValue: string,
    validateRules: TValidateRules,
    select?: boolean,
    selectOptions?: string[]
}

export interface IFormSettigs {
    [key: string]: IInputSettings
}



