import { useDeferredValue, useLayoutEffect, useRef, useState, useTransition } from 'react'
import { Results } from './Results'

type Mode = 'normal' | 'transition' | 'deferred'

export default function App() {
  const [mode, setMode] = useState<Mode>('deferred')
  const [text, setText] = useState('')
  const [listQuery, setListQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const deferredText = useDeferredValue(text)
  const inputAt = useRef(0)

  const shownQuery = mode === 'deferred' ? deferredText : listQuery
  const isStale = mode === 'deferred' ? text !== deferredText : isPending

  useLayoutEffect(() => {
    if (inputAt.current) console.log(`[input] "${text}" ${(performance.now() - inputAt.current).toFixed(0)} мс`)
  }, [text])

  useLayoutEffect(() => {
    if (inputAt.current) console.log(`[list] "${shownQuery}" ${(performance.now() - inputAt.current).toFixed(0)} мс`)
  }, [shownQuery])

  const handleChange = (value: string) => {
    inputAt.current = performance.now()
    setText(value)
    if (mode === 'transition') {
      startTransition(() => setListQuery(value))
    } else if (mode === 'normal') {
      setListQuery(value)
    }
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    setListQuery(text)
  }

  return (
    <main>
      <h1>Поиск курсов</h1>
      <p>
        Режим:{' '}
        <label>
          <input type="radio" checked={mode === 'normal'} onChange={() => switchMode('normal')} /> обычный
        </label>{' '}
        <label>
          <input type="radio" checked={mode === 'transition'} onChange={() => switchMode('transition')} /> transition
        </label>{' '}
        <label>
          <input type="radio" checked={mode === 'deferred'} onChange={() => switchMode('deferred')} /> deferred
        </label>
      </p>
      <label>
        Поиск <input value={text} onChange={(e) => handleChange(e.target.value)} />
      </label>
      <p>
        Результаты для «{shownQuery}» {isStale && <b>Обновляем результаты</b>}
      </p>
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <Results query={shownQuery} />
      </div>
    </main>
  )
}
