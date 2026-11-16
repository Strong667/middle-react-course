import { Profiler, useMemo, useState, type ProfilerOnRenderCallback } from 'react'
import { records, sortCourses, type Direction, type SortKey } from './data'
import type { Course } from './types'

type Mode = 'plain' | 'memo'

interface ListProps {
  items: readonly Course[]
  sortKey: SortKey
  direction: Direction
}

function Table({ rows }: { rows: readonly Course[] }) {
  return (
    <ol>
      {rows.slice(0, 10).map((c) => (
        <li key={c.id}>
          {c.title} — мест: {c.seats}
        </li>
      ))}
    </ol>
  )
}

function PlainList({ items, sortKey, direction }: ListProps) {
  const sorted = sortCourses(items, sortKey, direction)
  return <Table rows={sorted} />
}

function MemoList({ items, sortKey, direction }: ListProps) {
  const sorted = useMemo(() => sortCourses(items, sortKey, direction), [items, sortKey, direction])
  return <Table rows={sorted} />
}

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
  console.log(`[profiler] ${id} ${phase} ${actualDuration.toFixed(2)} мс`)
}

export default function App() {
  const [mode, setMode] = useState<Mode>('plain')
  const [count, setCount] = useState(0)
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [direction, setDirection] = useState<Direction>('asc')

  return (
    <main>
      <h1>Сортировка {records.length} записей</h1>
      <p>
        Режим:{' '}
        <label>
          <input type="radio" checked={mode === 'plain'} onChange={() => setMode('plain')} /> без useMemo
        </label>{' '}
        <label>
          <input type="radio" checked={mode === 'memo'} onChange={() => setMode('memo')} /> с useMemo
        </label>
      </p>
      <p>
        <button onClick={() => setCount((c) => c + 1)}>Счётчик: {count}</button>{' '}
        <label>
          Поле{' '}
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
            <option value="title">title</option>
            <option value="seats">seats</option>
          </select>
        </label>{' '}
        <button onClick={() => setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}>
          Направление: {direction === 'asc' ? 'по возрастанию' : 'по убыванию'}
        </button>
      </p>
      <p>Исходный массив: первая запись {records[0].id}, последняя {records[records.length - 1].id}</p>
      <Profiler id={mode} onRender={onRender}>
        {mode === 'plain' ? (
          <PlainList items={records} sortKey={sortKey} direction={direction} />
        ) : (
          <MemoList items={records} sortKey={sortKey} direction={direction} />
        )}
      </Profiler>
    </main>
  )
}
