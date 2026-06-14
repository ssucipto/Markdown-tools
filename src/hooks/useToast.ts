import { useCallback, useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [])

  return { toast, showToast }
}
