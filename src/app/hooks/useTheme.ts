import { useEffect, useState } from 'react'

export default function useTheme(): [string, () => void] {
  const theme = {
    light: 'white',
    dark: '#2196f3',
  }

  const [color, setColor] = useState<string>(localStorage.getItem('theme') || theme.light)

  useEffect(() => {
    localStorage.setItem('theme', color)
  }, [color])

  function toggle(): void {
    if (color === theme.light) {
      setColor(theme.dark)
    } else {
      setColor(theme.light)
    }
  }

  return [color, toggle]
}
