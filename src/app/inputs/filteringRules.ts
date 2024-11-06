export const categoryFilteringRules = {
    "category": [
        {inputValue: "Студент", hiddenFormFields: ["postGraduateEducationYear", "position", "department"]}, 
        {inputValue: "Аспирант", hiddenFormFields: ["studentsEducationYear", "position", "department"]},
        {inputValue: "Сотрудник", hiddenFormFields: ["studentsEducationYear", "postGraduateEducationYear"]}
    ],
}