import { useCallback, useState } from 'react'

export function useFavorites() {
  const [ids, setIds] = useState([])

  const toggle = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  return { ids, toggle, clear }
}
