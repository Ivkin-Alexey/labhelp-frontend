import { useCallback, useEffect, useRef, useState } from 'react'

import {
  CheckCircle as CheckCircleIcon,
  CloudUpload as CloudUploadIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Terminal as TerminalIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material'
import type { Theme } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useAppDispatch } from '../app/hooks/hooks'
import {
  useGetSyncEquipmentDbStatusQuery,
  useSyncEquipmentDbMutation,
  type TSyncStatus,
} from '../store/api/equipment/equipments-api'
import { clearUserData } from '../store/users-slice'

const LogContainer = styled(Paper)(({ theme }) => ({
  height: 400,
  overflow: 'auto',
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  padding: theme.spacing(2),
}))

interface LogEntry {
  id: number
  message: string
  timestamp: Date
  type: 'info' | 'error' | 'success'
}

const SYNC_POLLING_INTERVAL = 2000 // ms
const SYNC_TIMEOUT_MS = 120000 // ms

// RTK Query реджектит unwrap() обычным объектом (FetchBaseQueryError или
// SerializedError), а не экземпляром Error, поэтому проверяем поля напрямую
function getSyncErrorMessage(error: unknown): string {
  const e = error as {
    status?: number | string
    data?: { message?: string; detail?: string } | string
    error?: string
  }

  const data = e?.data

  if (typeof data === 'string' && data) {
    return data
  }

  if (typeof data === 'object' && data !== null) {
    const serverMessage = data.message ?? data.detail
    if (typeof serverMessage === 'string' && serverMessage) {
      return serverMessage
    }
  }

  if (e?.status === 'FETCH_ERROR') {
    return 'Сервер недоступен'
  }
  if (typeof e?.status === 'number') {
    return `Ошибка сервера (${e.status})`
  }
  if (e?.error) {
    return e.error
  }

  return 'Неизвестная ошибка'
}

// Даты приходят с сервера в ISO-формате
function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate)
  return Number.isNaN(date.getTime()) ? isoDate : date.toLocaleString()
}

// 401/403 на защищённом запросе означает протухший JWT: сессию нужно завершить.
// 403 приходит и при попытке не-админа дернуть админский маршрут — исход тот же
function isAuthError(error: unknown): boolean {
  const status = (error as { status?: number | string } | undefined)?.status
  return status === 401 || status === 403
}

function AdminPanel() {
  const dispatch = useAppDispatch()
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  // Поллинг статуса включаем только после того, как сервер принял задачу:
  // иначе первый опрос успевает вернуть статус предыдущей синхронизации
  const [isPolling, setIsPolling] = useState(false)
  const lastLoggedStatus = useRef<TSyncStatus | null>(null)
  const lastLoggedStage = useRef<string | null>(null)
  const syncStartedAt = useRef(0)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const [syncEquipmentDb] = useSyncEquipmentDbMutation()

  const {
    data: syncStatus,
    fulfilledTimeStamp,
    error: statusError,
    isError: isStatusError,
    isFetching: isStatusFetching,
  } = useGetSyncEquipmentDbStatusQuery(undefined, {
    pollingInterval: isPolling ? SYNC_POLLING_INTERVAL : 0,
  })

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const newLog = {
      id: Date.now() + Math.random(),
      message,
      timestamp: new Date(),
      type,
    }
    setLogs(prev => [...prev, newLog])

    // Автоскролл вниз
    setTimeout(() => {
      const logContainer = document.getElementById('log-container')
      if (logContainer) {
        logContainer.scrollTop = logContainer.scrollHeight
      }
    }, 100)
  }, [])

  const handleSyncDatabase = async () => {
    setLogs([])
    lastLoggedStatus.current = null
    lastLoggedStage.current = null
    syncStartedAt.current = Date.now()
    setIsSyncing(true)

    addLog('Запрос на синхронизацию базы данных отправлен', 'info')

    try {
      await syncEquipmentDb().unwrap()
      addLog('Сервер принял задачу, ожидаем завершения...', 'info')
      setIsPolling(true)
    } catch (error) {
      const errorMessage = getSyncErrorMessage(error)
      addLog(`Ошибка запроса синхронизации: ${errorMessage}`, 'error')

      if (isAuthError(error)) {
        // Токен протух. clearUserData обнуляет роль, RequireAdminRole
        // перебросит на signIn, а после входа вернёт обратно на /admin
        addLog('Сессия истекла, войдите заново', 'error')
        dispatch(clearUserData())
        return
      }

      setIsSyncing(false)
    }
  }

  useEffect(() => {
    if (!isSyncing || !isPolling || !syncStatus) {
      return
    }

    // Реагируем только на статусы, полученные после старта текущей синхронизации,
    // иначе сработаем на закэшированный ответ предыдущего запуска
    if (!fulfilledTimeStamp || fulfilledTimeStamp < syncStartedAt.current) {
      return
    }

    const { status, stageDescription, error, equipmentCount } = syncStatus

    // Этапы меняются внутри одного статуса pending, поэтому отслеживаем их
    // отдельно от статуса
    if (stageDescription && stageDescription !== lastLoggedStage.current) {
      lastLoggedStage.current = stageDescription
      addLog(stageDescription, 'info')
    }

    if (!status || status === lastLoggedStatus.current) {
      return
    }

    lastLoggedStatus.current = status

    if (status === 'success') {
      const count = equipmentCount ?? 0
      addLog(`Синхронизация завершена, записей: ${count}`, 'success')
      setIsSyncing(false)
      setIsPolling(false)
    }

    if (status === 'error') {
      const details = error ? `: ${error}` : ''
      addLog(`Синхронизация завершилась с ошибкой${details}`, 'error')
      setIsSyncing(false)
      setIsPolling(false)
    }
  }, [syncStatus, fulfilledTimeStamp, isSyncing, isPolling, addLog])

  // Опрос статуса упал даже после ретраев — выходим из syncing, иначе панель
  // зависнет с неактивной кнопкой в режиме «Синхронизация...»
  useEffect(() => {
    if (!isSyncing || !isPolling || !isStatusError || isStatusFetching) {
      return
    }

    // 401/403 при поллинге — токен протух уже во время синхронизации
    if (statusError && isAuthError(statusError)) {
      addLog('Сессия истекла, войдите заново', 'error')
      dispatch(clearUserData())
      return
    }

    addLog('Сервер не отвечает на запрос статуса синхронизации', 'error')
    setIsSyncing(false)
    setIsPolling(false)
  }, [isSyncing, isPolling, isStatusError, isStatusFetching, statusError, addLog, dispatch])

  // Страховка: если статус так и не сменился (бэкенд «потерял» задачу),
  // по таймауту разблокируем кнопку вместо вечного «Синхронизация...»
  useEffect(() => {
    if (!isSyncing) {
      return
    }
    const timer = window.setTimeout(() => {
      addLog('Превышено время ожидания синхронизации', 'error')
      setIsSyncing(false)
      setIsPolling(false)
    }, SYNC_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [isSyncing, addLog])

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20 }} />
      case 'error':
        return <ErrorIcon sx={{ color: '#f44336', fontSize: 20 }} />
      default:
        return <InfoIcon sx={{ color: '#2196f3', fontSize: 20 }} />
    }
  }

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ margin: isMobile ? '20px 0' : '20px 0 0' }}
      >
        Админ-панель
      </Typography>

      {/* Кнопки действия */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<CloudUploadIcon />}
          onClick={handleSyncDatabase}
          disabled={isSyncing}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
          }}
        >
          {isSyncing ? 'Синхронизация...' : 'Синхронизировать'}
        </Button>
      </Box>

      {/* Итог последней синхронизации виден и после её завершения */}
      {!isSyncing && syncStatus?.completedAt && (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
          {syncStatus.status === 'success'
            ? `Последняя синхронизация: ${formatDateTime(syncStatus.completedAt)}, записей: ${syncStatus.equipmentCount ?? 0}`
            : `Последняя синхронизация завершилась с ошибкой: ${formatDateTime(syncStatus.completedAt)}`}
        </Typography>
      )}

      {/* Логи выполнения */}
      <Box sx={{ mt: 3 }}>
        <LogContainer id="log-container" elevation={3}>
          {logs.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'grey.500',
              }}
            >
              <TerminalIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography variant="body2">
                Нажмите кнопку "Синхронизировать" для начала синхронизации
              </Typography>
            </Box>
          ) : (
            <List dense disablePadding>
              {logs.map(log => (
                <ListItem key={log.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>{getLogIcon(log.type)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        component="span"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}
                      >
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{ color: 'grey.500', fontFamily: 'monospace' }}
                        >
                          {log.timestamp.toLocaleTimeString()}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            color:
                              log.type === 'error'
                                ? '#f44336'
                                : log.type === 'success'
                                  ? '#4caf50'
                                  : '#fff',
                            fontFamily: 'monospace',
                          }}
                        >
                          {log.message}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </LogContainer>
      </Box>
    </Container>
  )
}

export default AdminPanel
