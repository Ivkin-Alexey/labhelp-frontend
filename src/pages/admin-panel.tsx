import { useCallback, useEffect, useRef, useState } from 'react'

import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Terminal as TerminalIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  LinearProgress,
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
import { useSnackbar } from 'notistack'

import {
  useGetSyncEquipmentDbStatusQuery,
  useSyncEquipmentDbMutation,
  type TSyncStatus,
} from '../store/api/equipment/equipments-api'

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

function AdminPanel() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  const lastLoggedStatus = useRef<TSyncStatus | null>(null)
  const { enqueueSnackbar } = useSnackbar()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const [syncEquipmentDb] = useSyncEquipmentDbMutation()

  const { data: syncStatus } = useGetSyncEquipmentDbStatusQuery(undefined, {
    pollingInterval: isSyncing ? SYNC_POLLING_INTERVAL : 0,
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

  const notify = useCallback(
    (message: string, variant: 'success' | 'error' | 'info') => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: variant === 'info' ? 2000 : 7000,
      })
    },
    [enqueueSnackbar],
  )

  const handleSyncDatabase = async () => {
    setLogs([])
    lastLoggedStatus.current = null
    setIsSyncing(true)

    addLog('Запрос на синхронизацию базы данных отправлен', 'info')

    try {
      await syncEquipmentDb().unwrap()
      addLog('Сервер принял задачу, ожидаем завершения...', 'info')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
      addLog(`Ошибка запроса синхронизации: ${errorMessage}`, 'error')
      notify(`Ошибка синхронизации: ${errorMessage}`, 'error')
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    const status = syncStatus?.status

    if (!isSyncing || !status || status === lastLoggedStatus.current) {
      return
    }

    lastLoggedStatus.current = status

    if (status === 'success') {
      addLog('База данных успешно синхронизирована', 'success')
      notify('База данных успешно синхронизирована', 'success')
      setIsSyncing(false)
    }

    if (status === 'error') {
      addLog('Синхронизация завершилась с ошибкой', 'error')
      notify('Синхронизация завершилась с ошибкой', 'error')
      setIsSyncing(false)
    }
  }, [syncStatus, isSyncing, addLog, notify])

  const clearLogs = () => {
    setLogs([])
    notify('Логи очищены', 'info')
  }

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
      <Typography variant="h5" sx={{ margin: isMobile ? '20px 0' : '20px 0 0' }}>
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
          {isSyncing ? 'Синхронизация...' : 'Обновить базу данных'}
        </Button>

        {logs.length > 0 && (
          <Button
            variant="outlined"
            size="large"
            startIcon={<CloseIcon />}
            onClick={clearLogs}
            disabled={isSyncing}
          >
            Очистить логи
          </Button>
        )}

        {isSyncing && (
          <Box sx={{ width: 160 }}>
            <LinearProgress />
          </Box>
        )}
      </Box>

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
                Нажмите кнопку "Обновить базу данных" для начала синхронизации
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
