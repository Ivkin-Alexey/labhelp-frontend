import { useEffect } from 'react'

import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { Link, useRouteError } from 'react-router-dom'

import reloadPage from './reload-page'
import { routes } from '../../app/constants/constants'

// После выкладки новой версии браузер может держать открытой старую страницу:
// её HTML ссылается на чанки с устаревшим хэшем, которых на сервере уже нет.
// Такой сбой лечится перезагрузкой — браузер получит свежий HTML и новые чанки
const CHUNK_RELOAD_KEY = 'labhelp:chunk-reload-at'
const CHUNK_RELOAD_INTERVAL_MS = 10_000

// Формулировки одной и той же ошибки в разных браузерах
const chunkErrorMarkers = [
  'Failed to fetch dynamically imported module',
  'Importing a module script failed',
  'error loading dynamically imported module',
  'Loading chunk',
  'Loading CSS chunk',
]

export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? '')
  return chunkErrorMarkers.some(marker => message.includes(marker))
}

function getReloadMark(): number {
  return Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) ?? 0)
}

// Перезагружаемся сами только один раз: если сбой повторился сразу после
// перезагрузки, дальше зацикливаться нельзя — показываем кнопку
function canAutoReload(): boolean {
  return Date.now() - getReloadMark() > CHUNK_RELOAD_INTERVAL_MS
}

function markReload() {
  sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()))
}

// Сброс метки после успешной загрузки приложения: без него метка жила бы всю
// сессию и следующая ошибка чанков не перезагрузилась бы автоматически
export function clearChunkReloadMark() {
  sessionStorage.removeItem(CHUNK_RELOAD_KEY)
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Неизвестная ошибка'
}

interface IErrorContentProps {
  error: unknown
  // Внутри роутера доступен Link, в верхнеуровневой границе (main.tsx) — нет
  showHomeLink?: boolean
}

export function ErrorContent({ error, showHomeLink = false }: IErrorContentProps) {
  const isChunk = isChunkLoadError(error)
  const isAutoReload = isChunk && canAutoReload()

  useEffect(() => {
    if (isAutoReload) {
      markReload()
      reloadPage()
    }
  }, [isAutoReload])

  if (isChunk) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        {isAutoReload ? (
          <Box role="alert" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={32} />
            <Typography variant="body1">Сайт обновился, перезагружаем страницу...</Typography>
          </Box>
        ) : (
          <Box role="alert" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5">Не удалось загрузить часть приложения</Typography>
            <Typography variant="body1" color="text.secondary">
              Сайт обновился, а открытая страница устарела. Перезагрузите её вручную
            </Typography>
            <Button variant="contained" onClick={() => reloadPage()}>
              Перезагрузить страницу
            </Button>
          </Box>
        )}
      </Container>
    )
  }

  return (
    <Container
      role="alert"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, gap: 2 }}
    >
      <Typography variant="h5">Что-то пошло не так</Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу — если она
        повторяется, напишите нам в контактах
      </Typography>
      <Typography
        variant="caption"
        sx={{ color: 'grey.500', fontFamily: 'monospace', maxWidth: '100%', wordBreak: 'break-word' }}
      >
        {getErrorMessage(error)}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => reloadPage()}>
          Перезагрузить страницу
        </Button>
        {showHomeLink && (
          <Button variant="outlined" component={Link} to={routes.main}>
            На главную
          </Button>
        )}
      </Box>
    </Container>
  )
}

// errorElement корневого маршрута: ловит ошибки рендера всех страниц,
// включая сбои загрузки чанков после деплоя
export default function ErrorPage() {
  const error = useRouteError()

  return <ErrorContent error={error} showHomeLink />
}
