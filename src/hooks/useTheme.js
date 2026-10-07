import { useEffect, useState } from 'react'

const KEY = 'dulce-morado-tema'

function initialTheme() {
  return localStorage.getItem(KEY) || 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(KEY, theme)
  }, [theme])

  return { theme, toggle: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')) }
}
