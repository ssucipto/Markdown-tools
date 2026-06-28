import { useCallback, useRef, useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const showToast = useCallback((msg: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast(msg)
    timerRef.current = setTimeout(() => setToast(null), 3000)
  }, [])

  return { toast, showToast }
}
