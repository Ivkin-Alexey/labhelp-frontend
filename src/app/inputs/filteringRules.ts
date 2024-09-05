export const categoryFilteringRules = {
    "category": [
        {inputValue: "Студент", hiddenFormFields: ["postGraduateEducationYear", "position"]}, 
        {inputValue: "Аспирант", hiddenFormFields: ["studentsEducationYear", "position"]},
        {inputValue: "Сотрудник", hiddenFormFields: ["studentsEducationYear", "postGraduateEducationYear"]}
    ],
}