import { Suspense } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import Fallback from './Fallback'
import { useAppSelector } from '../app/hooks/hooks'
import { selectIsAuth, selectRole } from '../store/selectors'

interface IRequireAuth {
  redirectTo: string
  children: JSX.Element
}

export function RequireAuth(props: IRequireAuth) {
  const isAuth = useAppSelector(selectIsAuth)
  const location = useLocation()

  if (!isAuth) {
    // from позволяет вернуть пользователя на исходную страницу после входа
    return <Navigate to={props.redirectTo} state={{ from: location.pathname }} replace />
  }

  return <Suspense fallback={Fallback()}>{props.children}</Suspense>
}

export function RequireAdminRole(props: IRequireAuth) {
  const role = useAppSelector(selectRole)
  const location = useLocation()

  if (role !== 'admin') {
    return <Navigate to={props.redirectTo} state={{ from: location.pathname }} replace />
  }

  return <Suspense fallback={Fallback()}>{props.children}</Suspense>
}
