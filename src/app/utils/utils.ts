import type { IEquipmentFilterState, IQueriesObject } from '../../models/equipments'

export function toLowerCaseFirstChart(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function encodeQueryParams(params: IQueriesObject) {
  const encodedParams = Object.entries(params)
      .map(([key, value]) => {
          if (Array.isArray(value)) {
              return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&');

  return `?${encodedParams}`;
}

export function checkIsFiltered(filtersState: IEquipmentFilterState) {
  return Object.keys(filtersState).length !== 0
}


