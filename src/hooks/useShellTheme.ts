import { useCallback, useState } from 'react'

const THEME_KEY = 'mdtools.theme'

function readTheme(): 'light' | 'dark' {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function writeTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // ignore
  }
}

export function useShellTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(readTheme)

  const handleThemeChange = useCallback((next: 'light' | 'dark') => {
    setTheme(next)
    writeTheme(next)
  }, [])

  return { theme, dark: theme === 'dark', handleThemeChange }
}
