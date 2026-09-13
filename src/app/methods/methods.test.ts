import { capitalize, createFullPersonName, createPersonName } from './methods'
import type { IUserForm } from '../../models/users'

const person = {
  lastName: 'Иванов',
  firstName: 'Иван',
  patronymic: 'Иванович',
} as IUserForm

describe('createPersonName', () => {
  it('собирает фамилию, имя и отчество', () => {
    expect(createPersonName(person)).toBe('Иванов Иван Иванович')
  })

  it('пропускает отсутствующую фамилию', () => {
    const name = createPersonName({ firstName: 'Иван', patronymic: 'Иванович' } as IUserForm)

    expect(name).toBe('Иван Иванович')
  })

  it('возвращает только имя, если остальные части пустые', () => {
    expect(createPersonName({ firstName: 'Иван' } as IUserForm)).toBe('Иван')
  })

  it('возвращает пустую строку без данных о человеке', () => {
    expect(createPersonName({} as IUserForm)).toBe('')
  })
})

describe('createFullPersonName', () => {
  it('собирает фамилию, имя и отчество', () => {
    expect(createFullPersonName(person)).toBe('Иванов Иван Иванович')
  })

  it('складывает пустые части в конце строки', () => {
    const name = createFullPersonName({ lastName: 'Иванов', firstName: 'Иван' } as IUserForm)

    expect(name).toBe('Иванов Иван')
  })

  it('возвращает пустую строку без данных о человеке', () => {
    expect(createFullPersonName({} as IUserForm)).toBe('')
  })
})

describe('capitalize', () => {
  it('делает первую букву заглавной', () => {
    expect(capitalize('иван')).toBe('Иван')
  })

  it('возвращает пустую строку без изменений', () => {
    expect(capitalize('')).toBe('')
  })
})
