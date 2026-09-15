// Отдельный модуль только ради тестов: window.location.reload в jsdom нельзя
// подменить через vi.spyOn (свойство non-configurable)
export default function reloadPage() {
  window.location.reload()
}
