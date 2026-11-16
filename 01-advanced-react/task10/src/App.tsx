import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CourseSelector, type SelectorOptions } from './CourseSelector'
import coursesData from './data/courses.json'
import type { Course } from './types'

const courses = coursesData as Course[]

export default function App() {
  const [count, setCount] = useState(0)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [showSeats, setShowSeats] = useState(true)
  const [stableCallback, setStableCallback] = useState(false)
  const [stableOptions, setStableOptions] = useState(false)

  const inlineSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }
  const memoSelect = useCallback((id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const memoOptions = useMemo<SelectorOptions>(() => ({ showSeats }), [showSeats])
  const inlineOptions: SelectorOptions = { showSeats }

  const onSelect = stableCallback ? memoSelect : inlineSelect
  const options = stableOptions ? memoOptions : inlineOptions

  const prev = useRef<{ onSelect: unknown; options: unknown; selectedIds: unknown } | null>(null)
  useEffect(() => {
    if (prev.current) {
      const changed = [
        prev.current.onSelect !== onSelect && 'onSelect',
        prev.current.options !== options && 'options',
        prev.current.selectedIds !== selectedIds && 'selectedIds',
      ].filter(Boolean)
      console.log(`[parent] изменились props: ${changed.join(', ') || 'нет'}`)
    }
    prev.current = { onSelect, options, selectedIds }
  })

  return (
    <main>
      <h1>memo и стабильные props</h1>
      <p>
        <label>
          <input type="checkbox" checked={stableCallback} onChange={(e) => setStableCallback(e.target.checked)} />{' '}
          onSelect через useCallback
        </label>
        <br />
        <label>
          <input type="checkbox" checked={stableOptions} onChange={(e) => setStableOptions(e.target.checked)} />{' '}
          options через useMemo
        </label>
        <br />
        <label>
          <input type="checkbox" checked={showSeats} onChange={(e) => setShowSeats(e.target.checked)} /> показывать
          места
        </label>
      </p>
      <p>
        <button onClick={() => setCount((c) => c + 1)}>Несвязанный счётчик: {count}</button>{' '}
        <button onClick={() => setSelectedIds([])}>Очистить выбор</button>
      </p>
      <p>Выбрано: {selectedIds.join(', ') || 'ничего'}</p>
      <CourseSelector courses={courses} selectedIds={selectedIds} onSelect={onSelect} options={options} />
    </main>
  )
}
