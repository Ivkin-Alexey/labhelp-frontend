import localisations from "../constants/localizations/localizations";

const {
    studentsEducationYearList,
    postGraduatesEducationYearList,
    categoryList,
} = localisations.components.form;

const personalData = {
    firstName: {
        label: 'Имя',
        id: 'outlined-required',
        required: true,
        initValue: "",
        validateRules: ["cyrillicTextOnly", {"minLength": 2}, {"maxLength": 30}]
    },
    lastName: {
        label: 'Фамилия',
        id: 'outlined-required',
        required: true,
        initValue: "",
        validateRules: ["cyrillicTextOnly"]
    },
    patronymic: {
        label: 'Отчество',
        id: 'outlined-basic',
        required: false,
        initValue: "",
        validateRules: ["cyrillicTextOnly"]
    },
    login: {
        label: 'Логин',
        id: 'outlined-basic',
        required: true,
        initValue: "",
        validateRules: ["login", {"minLength": 6}, {"maxLength": 16}]
    },
    password: {
        label: 'Пароль',
        id: 'outlined-basic',
        required: true,
        initValue: "",
        validateRules: ["password", {"minLength": 6}, {"maxLength": 16}]
    },
    position: {
        label: 'Должность',
        id: 'outlined-basic',
        required: true,
        initValue: "",
        validateRules: ["cyrillicTextOnly", "spaceBetweenWordsOnly"],
    },
    studentsEducationYear: {
        label: 'Курс',
        select: true,
        id: 'outlined-select-currency',
        required: true,
        initValue: studentsEducationYearList[0],
        validateRules: ["spaceBetweenWordsOnly"],
        selectOptions: studentsEducationYearList
    },
    postGraduateEducationYear: {
        label: 'Год обучения',
        select: true,
        id: 'outlined-select-currency',
        required: true,
        initValue: postGraduatesEducationYearList[0],
        validateRules: ["spaceBetweenWordsOnly"],
        selectOptions: postGraduatesEducationYearList
    },
    category: {
        label: 'Категория',
        select: true,
        id: 'outlined-select-currency',
        required: true,
        initValue: categoryList[0],
        validateRules: ["spaceBetweenWordsOnly"],
        selectOptions: categoryList
    },
}

export default personalData;