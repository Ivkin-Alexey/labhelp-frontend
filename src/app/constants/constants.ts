export const BASE_URL = 'https://scmp-bot-server.ru/'

export const DEFAULT_SEARCH_TERM = 'Печи'

export const SEARCH_DELAY = 1000 // ms

export const SEARCH_SUGGEST_NUMBER = 5

export const PASSWORD_SPECIAL_CHARACTERS = '!@#$%^&-_=+'

export const LOGIN_SPECIAL_CHARACTERS = '-_@'

export const routes = {
  main: '/',
  signIn: '/signin',
  signUp: '/signup',
  equipment: '/:equipmentId',
  favorites: '/favorites',
  history: '/history',
  search: '/search',
  operatingEquipments: '/operating-equipments',
  admin: '/admin',
  userProfile: '/admin/:login',
}

export const apiRoutes = {
  get: {
    users: {
      userData: '/users/',
      users: '/users',
    },
    equipments: {
      equipments: '/equipments',
      favorite: '/equipments/favorite/',
      operate: '/equipments/operate/',
      searchHistory: '/equipments/search-history/',
    },
  },
  post: {
    auth: {
      signIn: '/auth/sign-in/',
      signUp: '/auth/sign-up/',
    },
    users: {
      signUp: '/users/',
    },
    equipments: {
      favorite: '/equipments/favorite/',
      operate: '/equipments/operate/',
      searchHistory: '/equipments/search-history/',
    },
  },
  delete: {
    users: '/users/',
    equipments: {
      favorite: '/equipments/favorite/',
      operate: '/equipments/operate/',
      searchHistory: '/equipments/search-history/',
    },
  },
  patch: {
    users: '/users/',
  },
}
