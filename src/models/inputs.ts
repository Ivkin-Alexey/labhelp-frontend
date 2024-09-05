export type IStudentCategoryLabel = "Студент" | "Аспирант" | "Сотрудник"

export type IStudentCategory = "postGraduateEducationYear" | "studentsEducationYear" | "position"

export interface IStudentCategoryFilteringRule {
    inputValue: string; 
    hiddenFormFields: string[]
}

export type TValidateRules = Array<TValidateRule>

export type TValidateRule = string | { minLength: number} | {maxLength: number}

export type IInputArray = string[]

export interface IInputBase {
    label: string,
    id: string,
    required: boolean,
    initValue: string,
    validateRules: TValidateRules,
    select?: boolean,
    selectOptions?: string[]
}

export interface IFormBase {
    [key: string]: IInputBase
}



