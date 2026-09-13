import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants/constants'
import SignForm from '../components/sign-form/sign-form'
import type { IFormValues } from '../models/inputs'
import { useLazyGetAccountDataQuery, useSignUpMutation } from '../store/api/users-api'

export default function SignUpPage() {
  const [signup, { isLoading, isSuccess }] = useSignUpMutation()
  const [getAccountData, { isSuccess: isAccountSuccess }] = useLazyGetAccountDataQuery()

  const [savedLogin, setSavedLogin] = useState<FormDataEntryValue | null>(null)

  const navigate = useNavigate()

  const handleSubmit = (data: IFormValues) => {
    const { login, password } = data
    setSavedLogin(login)
    signup({ login, password, data })
  }

  // getAccountData сам кладёт пользователя в стейт (setUserData), поэтому
  // здесь только запускаем запрос и уходим на главную после его успеха
  useEffect(() => {
    if (isSuccess && savedLogin) {
      getAccountData(savedLogin.toString())
    }
  }, [isSuccess, savedLogin, getAccountData])

  useEffect(() => {
    if (isAccountSuccess) {
      navigate(routes.main)
    }
  }, [isAccountSuccess, navigate])

  return <SignForm handleSubmit={handleSubmit} title="Регистрация" isLoading={isLoading} />
}
