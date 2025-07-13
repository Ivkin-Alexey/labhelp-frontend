import type * as React from 'react'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants/constants'
import { useAppDispatch } from '../app/hooks/hooks'
import SignForm from '../components/sign-form/sign-form'
import type { IFormValues } from '../models/inputs'
import { useSignUpMutation } from '../store/api/users-api'
import { setUserData as loginAction } from '../store/users-slice'

export default function SignUpPage() {
  const [signup, { isError, isLoading, isSuccess }] = useSignUpMutation()

  const [savedLogin, setSavedLogin] = useState<FormDataEntryValue | null>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = (data: IFormValues) => {
    const { login, password } = data
    setSavedLogin(login)
    signup({ login, password, data })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate(routes.main)
      dispatch(loginAction(savedLogin))
    }
  }, [isSuccess])

  return <SignForm handleSubmit={handleSubmit} title="Регистрация" isLoading={isLoading} />
}
