import { Suspense } from 'react'

import { Navigate } from 'react-router-dom'

import Fallback from './Fallback'
import { useAppSelector } from '../app/hooks/hooks'
import { selectIsAuth, selectRole } from '../store/selectors'

interface IRequireAuth {
  redirectTo: string
  children: JSX.Element
}

export function RequireAuth(props: IRequireAuth) {
  const isAuth = useAppSelector(selectIsAuth)

  if (!isAuth) {
    return <Navigate to={props.redirectTo} />
  }

  return <Suspense fallback={Fallback()}>{props.children}</Suspense>
}

export function RequireAdminRole(props: IRequireAuth) {
  const role = useAppSelector(selectRole)

  if (role !== "admin") {
    return <Navigate to={props.redirectTo} />
  }

  return <Suspense fallback={Fallback()}>{props.children}</Suspense>
}
