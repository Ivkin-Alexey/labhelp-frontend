import { useEffect, useState } from 'react'

export default function useTheme(): [string, () => void] {
  const [color, setColor] = useState<string>(localStorage.getItem('color') || 'white')

  useEffect(() => {
    localStorage.setItem('color', color)
  }, [color])

  function toggle() {
    if (color === 'white') {
      setColor('#002884')
    } else {
      setColor('white')
    }
  }

  return [color, toggle]
}
