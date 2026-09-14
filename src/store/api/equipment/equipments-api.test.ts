import { configureStore } from '@reduxjs/toolkit'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { equipmentsApi } from './equipments-api'
import { operateEquipmentApi } from './operate-equipment'
import { accountSlice } from '../../users-slice'
import { api } from '../api'

// Идентификаторы приходят из Google-таблицы и содержат '/', пробелы и другие
// символы, которые в URL имеют своё значение. Именно такой id ломал переход на
// карточку: '/equipments/a/b' — это два сегмента пути вместо одного
const ID_WITH_SLASH = '201204328_2_A30784900376/A30704901386'
const ID_WITH_SPACE = '000000000031573_06/ 513416'

let requestedUrls: string[]

function makeStore() {
  return configureStore({
    reducer: {
      account: accountSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  })
}

// fetchBaseQuery передаёт в fetch либо строку, либо Request — поддерживаем оба
function readUrl(input: RequestInfo | URL) {
  if (typeof input === 'string') {
    return input
  }
  return input instanceof URL ? input.href : input.url
}

// Идентификатор должен занимать ровно один сегмент пути — последний: сырая
// косая черта разрезала бы его на несколько, и сервер получил бы только хвост
function expectIdInSingleSegment(url: string, equipmentId: string) {
  const segments = new URL(url).pathname.split('/')
  const lastSegment = segments[segments.length - 1]

  expect(decodeURIComponent(lastSegment)).toBe(equipmentId)
}

beforeEach(() => {
  requestedUrls = []
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL) => {
      requestedUrls.push(readUrl(input))
      return new Response(JSON.stringify({ id: ID_WITH_SLASH, name: 'Стенд' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchEquipmentByID', () => {
  it('экранирует id с косой чертой, чтобы он остался одним сегментом пути', async () => {
    const store = makeStore()

    const request = store.dispatch(
      equipmentsApi.endpoints.fetchEquipmentByID.initiate({ equipmentId: ID_WITH_SLASH }),
    )
    const result = await request
    request.unsubscribe()

    expect(result.data?.id).toBe(ID_WITH_SLASH)
    expectIdInSingleSegment(requestedUrls[0], ID_WITH_SLASH)
  })

  it('экранирует пробел в id', async () => {
    const store = makeStore()

    const request = store.dispatch(
      equipmentsApi.endpoints.fetchEquipmentByID.initiate({ equipmentId: ID_WITH_SPACE }),
    )
    await request
    request.unsubscribe()

    expectIdInSingleSegment(requestedUrls[0], ID_WITH_SPACE)
  })
})

describe('addOperatingEquipment', () => {
  it('экранирует id с косой чертой в пути запроса', async () => {
    const store = makeStore()

    // У мутаций initiate возвращает экшен-креатор — его нужно dispatch'нуть
    await store.dispatch(
      operateEquipmentApi.endpoints.addOperatingEquipment.initiate({
        login: 'test',
        equipmentId: ID_WITH_SLASH,
      }),
    )

    expectIdInSingleSegment(requestedUrls[0], ID_WITH_SLASH)
  })
})
