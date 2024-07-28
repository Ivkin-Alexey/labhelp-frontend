import type * as React from 'react'
import { useEffect, useState } from 'react'

import { useErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants'
import { useAppDispatch } from '../app/hooks/hooks'
import SignForm from '../components/sign-form/sign-form'
import { useSignInMutation } from '../store/users-api'
import { login as loginAction } from '../store/users-slice'

export default function SignInPage() {
  const [signIn, { isError, isLoading, isSuccess, error }] = useSignInMutation()
  const { showBoundary } = useErrorBoundary()

  const [savedLogin, setSavedLogin] = useState<FormDataEntryValue | null>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const login = data.get('login')
    const password = data.get('password')

    setSavedLogin(login)
    signIn({
      login,
      password,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate(routes.main)
      dispatch(loginAction(savedLogin))
    }
  }, [isSuccess])

  if (isError) {
    showBoundary(error)
  }

  if (isLoading) {
    // TODO: implement loading animation
  }

  return (
    <SignForm handleSubmit={handleSubmit} isLoading={isLoading} title="Войти" isSignIn={true} />
  )
}
