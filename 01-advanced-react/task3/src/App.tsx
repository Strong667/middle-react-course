import { useLayoutEffect, useRef, useState, useTransition } from 'react'
import { Results } from './Results'

type Mode = 'normal' | 'transition'

export default function App() {
  const [mode, setMode] = useState<Mode>('transition')
  const [text, setText] = useState('')
  const [listQuery, setListQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const inputAt = useRef(0)

  useLayoutEffect(() => {
    if (inputAt.current) console.log(`[input] "${text}" ${(performance.now() - inputAt.current).toFixed(0)} мс`)
  }, [text])

  useLayoutEffect(() => {
    if (inputAt.current) console.log(`[list] "${listQuery}" ${(performance.now() - inputAt.current).toFixed(0)} мс`)
  }, [listQuery])

  const handleChange = (value: string) => {
    inputAt.current = performance.now()
    setText(value)
    if (mode === 'transition') {
      startTransition(() => setListQuery(value))
    } else {
      setListQuery(value)
    }
  }

  return (
    <main>
      <h1>Поиск курсов</h1>
      <p>
        Режим:{' '}
        <label>
          <input type="radio" checked={mode === 'normal'} onChange={() => setMode('normal')} /> обычный
        </label>{' '}
        <label>
          <input type="radio" checked={mode === 'transition'} onChange={() => setMode('transition')} /> transition
        </label>
      </p>
      <label>
        Поиск <input value={text} onChange={(e) => handleChange(e.target.value)} />
      </label>
      <p>
        Запрос списка: «{listQuery}» {isPending && <b>обновляется…</b>}
      </p>
      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        <Results query={listQuery} />
      </div>
    </main>
  )
}
