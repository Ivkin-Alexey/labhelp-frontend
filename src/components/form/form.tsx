import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {MenuItem, Stack, TextField} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import validateInputValue from "../../app/inputs/validators";
import inputsSettings from "../../app/inputs/inputs";
import {useNavigate} from "react-router-dom";
import localisations from "../../app/constants/localizations/localizations";
import { IUserFormData, TLogin } from '../../models/users';
import { IInputSettings, TInputArray, IStudentCategoryFilteringRule, TInputValue, IFormValues} from '../../models/inputs';
import { IUserForm } from '../../models/users';
import { useAppSelector } from '../../app/hooks/hooks';
import { selectLogin } from '../../store/selectors';
import CircularButton from '../circular-button';

interface IFormProps {
    inputList: TInputArray,
    defaultInputValues: IUserForm,
    filteringRules: {[key: string]: IStudentCategoryFilteringRule[]},
    submit: (formData: IUserFormData) => void,
    confirmMessage?: string,
    btnText?: string
    header?: string
    optionalButtons?: React.ReactNode | undefined
}

interface IFormState {
    [key: string]: IInputState
}

interface IInputState {
    required: boolean,
    validateRules: string[],
    value: IUserForm[keyof IUserForm], 
    isValid: boolean, 
    errorText: string
}

const Form = (props: IFormProps) => {
        const {
        inputList: inputLabelList,
        defaultInputValues,
        filteringRules,
        confirmMessage,
        submit,
        btnText = "Отправить",
        header = localisations.components.form.header,
        optionalButtons
    } = props

    const accountLogin = useAppSelector(selectLogin)

    const defaultFormState: IFormState = useMemo(() => inputLabelList.reduce((acc, cur) => {

        let inputSettings: IInputSettings = inputsSettings[cur]

        const {required, initValue, validateRules} = inputSettings;
        const value: TInputValue = defaultInputValues[cur as keyof IUserForm] || initValue;

        return {
            ...acc,
            [cur]: {
                required,
                validateRules,
                ...validateInputValue(value, validateRules, required),
            }
        }
    }, {}), []);

    const [formState, setFormState] = useState<IFormState>(defaultFormState);
    const [textInputs, setTextInputs] = useState(filterInputs());
    const [isDisabled, setIsDisabled] = useState(true);

    const formValues = useMemo(() => {
        const formValues: IFormValues = {}
        for(let key in formState) {
            formValues[key] = formState[key].value
        }
        return formValues
    }, [formState])

    const onSendData = useCallback(() => {
        console.log(formState)
        submit({login: accountLogin, data: formValues});
    }, [formState]);

    // function popupCallback() {
    //     if(accountData.role === "superAdmin") navigate(-1);
    //     else tg.close()
    // }

    useEffect(() => {
        if (validateFormData()) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
        setTextInputs(() => filterInputs());
        setFormState(() => formState)
    }, [formState]);

    const onChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let {name, value} = e.target;
        value = value ? value[0].toUpperCase() + value.slice(1) : "";
        setFormState(state => {
            const inputState: IInputState = state[name as keyof IFormState]

            return {
                ...state,
                [name as keyof IFormState]: {
                    ...inputState,
                    ...validateInputValue(value, inputState.validateRules, inputState.required)
                }
            };
        })
    }

    function filterInputs() {
        let hiddenInputs: string[] = [];
        for (let rule in filteringRules) {
            const arr = filteringRules[rule];
            const obj = arr.find(el => el.inputValue === formState[rule].value);
            if(obj) hiddenInputs = [...hiddenInputs, ...obj.hiddenFormFields];
        }
        return inputLabelList.filter(el => !hiddenInputs.includes(el));
    }

    function validateFormData() {
        return Object.values(formState).find(el => el.isValid === false);
    }

    function renderSelectOptions(options: string[]) {
        return options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem> 
        ))
    }

    function renderTextFields() {
        return textInputs.map((el, i) => {
            const {value, isValid, errorText} = formState[el as keyof IFormState];
            const {selectOptions, id, label, select, required} = inputsSettings[el];
            return <TextField
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
            >{selectOptions && renderSelectOptions(selectOptions)}
            </TextField>
        })
    }

    return (
        <Stack
            direction="column"
            spacing={2}
            width={"350px"}
            marginBottom={"50px"}
            component="form"
            noValidate
            autoComplete="off"
        >
            <ListSubheader component="div">
                {header}
            </ListSubheader>
            {renderTextFields()}
            <CircularButton isLoading >{btnText}</CircularButton>
            <Button variant="contained" disabled={isDisabled} onClick={onSendData}>{btnText}</Button>
            {optionalButtons ?? null}
        </Stack>
    );
};

export default Form;