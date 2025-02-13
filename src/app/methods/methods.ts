import type { IUserForm } from '../../models/users'

export function createPersonName(person: IUserForm) {
  const { firstName, lastName, patronymic } = person
  let name = ''
  if (lastName) {
    name += lastName
    if (firstName) {
      name += ' ' + firstName
    }
    if (patronymic) {
      name += ' ' + patronymic
    }
  } else if (firstName) {
    name += firstName
    if (patronymic) {
      name += ' ' + patronymic
    }
  }
  return name
}

export function createFullPersonName(personData: IUserForm) {
  const { firstName, lastName, patronymic } = personData || {}
  return ((lastName ?? '') + ' ' + (firstName ?? '') + ' ' + (patronymic ?? '')).trim()
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
