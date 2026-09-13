import { describe, expect, it } from 'vitest'

import { decodeQueryParams, encodeQueryParams } from './utils'

describe('encodeQueryParams', () => {
  it('возвращает пустую строку без параметров', () => {
    expect(encodeQueryParams({})).toBe('')
  })

  it('собирает query-строку и сериализует массивы в JSON', () => {
    const params = encodeQueryParams({ term: 'спектр фотометр', brands: ['Сименс', 'Аналит'] })

    expect(params).toBe(
      `?term=${encodeURIComponent('спектр фотометр')}&brands=${encodeURIComponent(
        JSON.stringify(['Сименс', 'Аналит']),
      )}`,
    )
  })
})

describe('decodeQueryParams', () => {
  it('достает term и приводит массивы обратно из JSON', () => {
    const url = encodeQueryParams({ term: 'спектрометр', brands: ['Сименс'] })
    const { filters, term } = decodeQueryParams(url)

    expect(term).toBe('спектрометр')
    expect(filters).toEqual({ brands: ['Сименс'] })
  })

  it('возвращает null фильтров, если их нет', () => {
    expect(decodeQueryParams('/search?term=%20')).toEqual({ filters: null, term: ' ' })
  })
})
