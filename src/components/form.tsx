import React, {useCallback, useEffect, useState} from 'react';
import {MenuItem, Stack, TextField} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import validateInputValue from "../app/inputs/validators";
import inputs from "../app/inputs/inputs";
import {useNavigate} from "react-router-dom";
import localisations from "../app/constants/localizations/localizations";
import { IUserCard } from '../models/users';
import { IFormBase, IInputBase, IInputArray, IStudentCategoryFilteringRule } from '../models/inputs';

interface IFormProps {
    defaultTextInputs: IInputArray,
    defaultValues: IUserCard,
    filteringRules: {[key: string]: IStudentCategoryFilteringRule[]},
    sendData: (data: IUserCard) => void,
    confirmMessage?: string
}

interface IFormState {
    [key: string]: IFormInputState
}

interface IFormInputState {
    required: boolean,
    validateRules: string[],
    value: string, 
    isValid: boolean, 
    errorText: string
}

const Form = (props: IFormProps) => {
        const {
        defaultTextInputs,
        defaultValues,
        filteringRules,
        confirmMessage,
        sendData = defaultOnSendData
    } = props;

    const defaultFormState: IFormState = defaultTextInputs.reduce((acc, cur) => {
        let inputItem: IInputBase = inputs[cur];

        const {required, initValue, validateRules} = inputItem;
        const value = defaultValues ? defaultValues[cur as keyof IUserCard] : initValue;

        return {
            ...acc,
            [cur]: {
                required,
                validateRules,
                ...validateInputValue(value, validateRules, required),
            }
        }
    }, {});

    const [formState, setFormState] = useState<IFormState>(defaultFormState);
    const [textInputs, setTextInputs] = useState(filterInputs());
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    // const [updatePerson, {isSuccess}] = useUpdatePersonMutation();

    const onSendData = useCallback(() => {
        // const formDataEntries = Object.entries(formData).map(el => [el[0], el[1].value]);
        // const data = Object.fromEntries(formDataEntries);
        // sendData(data);
    }, [formState]);

    function defaultOnSendData(data: IUserCard) {
        console.log(data)
        // updatePerson(chatID, accountChatID, data, queryId);
    }

    // useEffect(() => {
        
    // }, [isSuccess])

    // function popupCallback() {
    //     if(accountData.role === "superAdmin") navigate(-1);
    //     else tg.close()
    // }

    // useEffect(() => {
    //     tg.onEvent('mainButtonClicked', onSendData)
    //     return () => {
    //         tg.offEvent('mainButtonClicked', onSendData)
    //     }
    // }, [onSendData])

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
            const {validateRules, required} = state[name as keyof IFormState];
            const obj: IFormInputState = state[name as keyof IFormState]
            return {
                ...state,
                [name as keyof IFormState]: {
                    ...obj,
                    ...validateInputValue(value, validateRules, required)
                }
            };
        })
    }

    function handleSubmit() {
        if(!validateFormData()) onSendData()
    }


    function filterInputs() {
        let hiddenInputs: string[] = [];
        for (let rule in filteringRules) {
            const arr = filteringRules[rule];
            const obj = arr.find(el => el.inputValue === formState[rule].value);
            if(obj) hiddenInputs = [...hiddenInputs, ...obj.hiddenFormFields];
        }
        return defaultTextInputs.filter(el => !hiddenInputs.includes(el));
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
            const {selectOptions, id, label, select, required} = inputs[el];
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
                {localisations.components.form.header}
            </ListSubheader>
            {renderTextFields()}
            <Button disabled={isDisabled} onClick={handleSubmit}>Отправить</Button>
        </Stack>
    );
};

export default Form;