import type { IEquipmentFilterState, IQueriesObject } from '../../models/equipments'

interface DecodedQueryParams {
  filters: Record<string, any> | null;
  term: string;
}

export function toLowerCaseFirstChart(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function encodeQueryParams(params: IQueriesObject) {
  const encodedParams = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')

  return encodedParams ? `?${encodedParams}` : ""
}

export function decodeQueryParams(url: string): DecodedQueryParams {
  let filters: Record<string, any> | null = {};
  let term = '';
  
  // Извлекаем часть URL после '?' и декодируем
  const queryString = url.split('?')[1] || '';
  const pairs = queryString.split('&').filter(Boolean);

  for (const pair of pairs) {
    let [key, value] = pair.split('=');
    
    // Декодируем ключ и значение
    key = decodeURIComponent(key || '');
    value = decodeURIComponent((value || '').replace(/\+/g, ' '));

    // Пытаемся распарсить JSON-массив/объект
    try {
      if (/^[\[{]/.test(value) && /[\]}]$/.test(value)) {
        value = JSON.parse(value);
      }
    } catch (e) {
      // Оставляем как строку при ошибке парсинга
    }

    // Отделяем searchTerm от filters
    if (key === 'term') {
      term = value;
    } else {
      filters[key] = value;
    }
  }

  if(JSON.stringify(filters) === "{}") {
    filters = null
  }

  return { filters, term };
}

export function checkIsFiltered(filtersState: IEquipmentFilterState) {
  return Object.keys(filtersState).length !== 0
}
