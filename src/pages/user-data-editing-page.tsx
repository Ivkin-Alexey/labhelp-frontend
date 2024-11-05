import forms from '../app/inputs/forms';
import localisations from '../app/constants/localizations/localizations';
import Form from "../components/form/form";
import {redirect, useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import { categoryFilteringRules } from '../app/inputs/filteringRules';
import { IUserCard, IUserFormData, TLogin } from '../models/users';
import { Container } from '@mui/material';
import OptionalUserFormButtons from '../components/form/option-buttons';
import { ConstructionOutlined } from '@mui/icons-material';
import { routes } from '../app/constants/constants';
import React, { useEffect } from 'react';
import { IFormValues } from '../models/inputs';
import { useDeletePersonMutation, useUpdatePersonDataMutation } from '../store/users-api';
import { selectLogin } from '../store/selectors';
import { useAppSelector } from '../app/hooks/hooks';

const EditPersonalDataPage = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const accountLogin = useAppSelector(selectLogin)

    const login: TLogin | undefined = location.pathname.split("/").at(-1)

    const message = localisations.pages.editPersonalData.confirmMsg

    const [sendData, {isSuccess: isSuccessUpdate, isError: isErrorUpdate, isLoading: isLoadingUpdate}] = useUpdatePersonDataMutation()
    const [deleteMutation, {isSuccess: isSuccessDelete, isError: isErrorDelete, isLoading: isLoadingDelete}] = useDeletePersonMutation()

    const userList: IUserCard[] = [
        {
          login: "26594",
          password: "123456",
          firstName: "Иван",
          lastName: "Иванов",
          patronymic: "Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
        {
          login: "26595",
          password: "123456",
          firstName: "Иван",
          lastName: "Иванов",
          patronymic: "Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
        {
          login: "26596",
          password: "123456",
          firstName: "Иван",
          lastName: "Иванов",
          patronymic: "Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
        {
          login: "26597",
          password: "123456",
          firstName: "Иван",
          lastName: "Иванов",
          patronymic: "Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
        {
          login: "26598",
          password: "123456",
          firstName: "Иван",
          lastName: "Иванов",
          patronymic: "Иванович",
          position: "научный сотрудник",
          department: "НЦ Переработки ресурсов",
          equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
          isVerified: false
        },
          {
            login: "26599",
            password: "123456",
            firstName: "Иван",
            lastName: "Иванов",
            patronymic: "Иванович",
            position: "научный сотрудник",
            department: "НЦ Переработки ресурсов",
            equipments: { inaccessible: [1, 2, 3], available: [4, 5, 6] },
            isVerified: false
          },
      ]

      const userData: IUserCard | undefined = userList.find(el => el.login === login)
      if(!userData) return null

      function handleDeletePerson(login: TLogin | undefined) {
          if(!login) return
          console.log(login)
          deleteMutation({login: accountLogin, deletedPersonLogin: login})
      }

      const optionalButtons = () => {
        if (userData.role !== "admin") return <OptionalUserFormButtons handleOnClick={() => handleDeletePerson(login)}/>
      }

      useEffect(() => {
        if(isSuccessDelete) {
          navigate(routes.admin)
        }
      }, [isSuccessDelete])

    return <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Form inputList={forms.editPersonalData}
                 defaultInputValues={userData}
                 confirmMessage={message}
                 filteringRules={categoryFilteringRules}
                 submit={sendData}
                 btnText="Подтвердить"
                 header="Данные пользователя:"
                 optionalButtons={optionalButtons()}
    />
    </Container>
};

export default EditPersonalDataPage;