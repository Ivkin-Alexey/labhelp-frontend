import { ErrorContent } from '../components/error-page/error-page'

// Верхнеуровневая граница ошибок в main.tsx: находится снаружи роутера, поэтому
// Link здесь недоступен — кнопка «На главную» показывается только в ErrorPage
export default function FallbackRender({ error }: { error: unknown }) {
  return <ErrorContent error={error} />
}
