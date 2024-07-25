import type * as React from 'react'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { routes } from '../app/constants'
import { useAppDispatch } from '../app/hooks/hooks'
import SignForm from '../components/sign-form/sign-form'
import { useSignUpMutation } from '../store/users-api'
import { login } from '../store/users-slice'

export default function SignUpPage() {
  const [signup, { isError, isLoading, isSuccess }] = useSignUpMutation()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    signup({
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

  return <SignForm handleSubmit={handleSubmit} title="Зарегистрироваться" />
}
