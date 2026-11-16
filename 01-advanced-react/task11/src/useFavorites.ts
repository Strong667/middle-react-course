import { useCallback, useState } from 'react'

export function useFavorites(initial: string[] = []) {
  const [ids, setIds] = useState<string[]>(initial)

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  return { ids, toggle, clear }
}
