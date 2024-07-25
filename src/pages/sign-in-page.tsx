import type * as React from 'react'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants'
import { useAppDispatch } from '../app/hooks/hooks'
import SignForm from '../components/sign-form/sign-form'
import { useSignInMutation } from '../store/users-api'
import { login } from '../store/users-slice'

export default function SignInPage() {
  const [signIn, { isError, isLoading, isSuccess }] = useSignInMutation()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    signIn({
      login: data.get('login'),
      password: data.get('password'),
    })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate(routes.main)
      dispatch(login())
    }
  }, [isSuccess])

  if (isError) {
    // TODO: implement errors handling
  }

  if (isLoading) {
    // TODO: implement loading animation
  }

  return <SignForm handleSubmit={handleSubmit} title="Войти" isSignIn={true} />
}
