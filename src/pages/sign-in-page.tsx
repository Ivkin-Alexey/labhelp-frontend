import { useEffect, useState } from 'react'

import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants/constants'
import { useAppSelector } from '../app/hooks/hooks'
import SignForm from '../components/sign-form/sign-form'
import type { IFormValues } from '../models/inputs'
import { useLazyGetAccountDataQuery, useSignInMutation } from '../store/api/users-api'
import { selectToken } from '../store/selectors'

export default function SignInPage() {
  const [
    signIn,
    {
      isError: isAuthError,
      error: authError,
      isLoading: isAuthLoading,
      isSuccess: isAuthSuccess,
      reset: resetSignIn,
    },
  ] = useSignInMutation()

  const [getAccountData, { isSuccess: isAccountSuccess }] = useLazyGetAccountDataQuery()

  const { enqueueSnackbar } = useSnackbar()

  const [savedLogin, setSavedLogin] = useState<FormDataEntryValue | null>(null)

  const navigate = useNavigate()
  const token = useAppSelector(selectToken)

  const handleSubmit = (data: IFormValues) => {
    const { login, password } = data
    setSavedLogin(login)
    signIn({
      login,
      password,
    })
  }

  useEffect(() => {
    if (isAuthSuccess && savedLogin && token) {
      getAccountData(savedLogin.toString())
    }
  }, [isAuthSuccess, savedLogin, token, getAccountData])

  useEffect(() => {
    if (isAccountSuccess) {
      navigate(routes.main)
    }
  }, [isAccountSuccess, navigate])

  // Ошибка входа — штатная ситуация (например, неверный пароль), поэтому показываем
  // сообщение, а не роняем приложение на ErrorBoundary
  useEffect(() => {
    if (!isAuthError) {
      return
    }
    enqueueSnackbar(getSignInErrorMessage(authError), {
      variant: 'error',
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      autoHideDuration: 7000,
    })
    resetSignIn()
  }, [isAuthError, authError, enqueueSnackbar, resetSignIn])

  return (
    <SignForm handleSubmit={handleSubmit} isLoading={isAuthLoading} title="Вход" isSignIn={true} />
  )
}

function getSignInErrorMessage(error: unknown) {
  const status = (error as { status?: number | string } | undefined)?.status

  if (status === 401 || status === 403) {
    return 'Неверный логин или пароль'
  }
  if (status === 'FETCH_ERROR') {
    return 'Сервер недоступен, попробуйте позже'
  }
  return 'Не удалось войти, попробуйте позже'
}
