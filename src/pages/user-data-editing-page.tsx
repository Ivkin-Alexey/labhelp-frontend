import { useEffect } from 'react'

import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import NotExistPage from './404-page'
import { routes } from '../app/constants/constants'
import localisations from '../app/constants/localizations/localizations'
import { useAppSelector } from '../app/hooks/hooks'
import { categoryFilteringRules } from '../app/inputs/filteringRules'
import forms from '../app/inputs/forms'
import Fallback from '../components/Fallback'
import Form from '../components/form/form'
import OptionalUserFormButtons from '../components/form/option-buttons'
import type { IUserCard, TLogin } from '../models/users'
import {
  useDeletePersonMutation,
  useGetUserListQuery,
  useUpdatePersonDataMutation,
} from '../store/api/users-api'
import { selectLogin } from '../store/selectors'

const EditPersonalDataPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const accountLogin = useAppSelector(selectLogin)

  const login: TLogin | undefined = location.pathname.split('/').at(-1)

  const message = localisations.pages.editPersonalData.confirmMsg

  const { data: userList, isLoading: isUserListLoading } = useGetUserListQuery(accountLogin)

  const [sendData, { isLoading: isLoadingUpdate }] = useUpdatePersonDataMutation()
  const [deleteMutation, { isSuccess: isSuccessDelete, isLoading: isLoadingDelete }] =
    useDeletePersonMutation()

  useEffect(() => {
    // После удаления пользователя возвращаемся в список; после сохранения
    // или подтверждения остаёмся на странице пользователя
    if (isSuccessDelete) {
      navigate(routes.usersList)
    }
  }, [isSuccessDelete, navigate])

  // Пока список грузится, данных может не быть — не считаем это ошибкой
  const isUnknownUser = !isUserListLoading && !userList?.some(el => el.login === login)
  if (isUnknownUser) {
    // Пользователя нет в БД: пустой экран не информативен, показываем 404
    return <NotExistPage />
  }

  const userData: IUserCard | undefined = userList?.find(el => el.login === login)
  if (!userData) {
    return Fallback()
  }

  // Переключатель «Подтверждён»: PATCH уходит только с флагом и логином —
  // логин строит URL патча, без него уходит PATCH /users/undefined
  function handleVerifiedChange(isVerified: boolean) {
    sendData({ login, isVerified })
  }

  function handleDeletePerson(login: TLogin | undefined) {
    if (!login) {
      return
    }
    deleteMutation({ login: accountLogin, deletedPersonLogin: login })
  }

  const optionalButtons = () => {
    // Кнопка удаления не показывается для админов: админов удалять нельзя,
    // серверная проверка — страховка на случай прямого запроса в обход UI
    if (userData.role === 'admin') {
      return null
    }
    return (
      <OptionalUserFormButtons
        handleOnClick={() => handleDeletePerson(login)}
        isLoading={isLoadingDelete}
      />
    )
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Form
        inputList={forms.editPersonalData}
        defaultInputValues={userData}
        confirmMessage={message}
        filteringRules={categoryFilteringRules}
        disabledInputs={['login']}
        onSendData={sendData}
        isLoading={isLoadingUpdate}
        btnText="Сохранить изменения"
        header="Данные пользователя:"
        // Кнопка «Сохранить» неактивна, пока поля не меняли: PATCH уйдёт
        // только с изменёнными полями, без изменений отправлять нечего
        requireChange
        isVerified={userData.isVerified}
        onVerifiedChange={handleVerifiedChange}
        optionalButtons={optionalButtons()}
      />
    </Container>
  )
}

export default EditPersonalDataPage
