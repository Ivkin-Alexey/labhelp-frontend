import { useEffect } from 'react'

import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { routes } from '../app/constants/constants'
import localisations from '../app/constants/localizations/localizations'
import { useAppSelector } from '../app/hooks/hooks'
import { categoryFilteringRules } from '../app/inputs/filteringRules'
import forms from '../app/inputs/forms'
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

  const { data: userList, isFetching, isError } = useGetUserListQuery(accountLogin)

  const [
    sendData,
    { isSuccess: isSuccessUpdate, isError: isErrorUpdate, isLoading: isLoadingUpdate },
  ] = useUpdatePersonDataMutation()
  const [
    deleteMutation,
    { isSuccess: isSuccessDelete, isError: isErrorDelete, isLoading: isLoadingDelete },
  ] = useDeletePersonMutation()

  useEffect(() => {
    if (isSuccessDelete || isSuccessUpdate) {
      navigate(routes.admin)
    }
  }, [isSuccessDelete, isSuccessUpdate])

  const userData: IUserCard | undefined = userList?.find(el => el.login === login)
  if (!userData) {
    return null
  }

  function handleDeletePerson(login: TLogin | undefined) {
    if (!login) {
      return
    }
    deleteMutation({ login: accountLogin, deletedPersonLogin: login })
  }

  const optionalButtons = () => {
    if (userData.role !== 'admin') {
      return (
        <OptionalUserFormButtons
          handleOnClick={() => handleDeletePerson(login)}
          isLoading={isLoadingDelete}
        />
      )
    }
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
        btnText="Подтвердить"
        header="Данные пользователя:"
        optionalButtons={optionalButtons()}
      />
    </Container>
  )
}

export default EditPersonalDataPage
