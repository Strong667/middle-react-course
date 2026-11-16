import { useRef, useState } from 'react'
import coursesData from './data/courses.json'
import type { Course } from './types'

const courses = coursesData as Course[]

function filterCourses(query: string) {
  const q = query.trim().toLowerCase()
  return courses.filter((c) => c.title.toLowerCase().includes(q))
}

function CourseList({ query }: { query: string }) {
  const items = filterCourses(query)
  if (items.length === 0) return <p>Ничего не найдено</p>
  return (
    <ul>
      {items.map((c) => (
        <li key={c.id}>{c.title}</li>
      ))}
    </ul>
  )
}

function ControlledFilter() {
  const [query, setQuery] = useState('')

  return (
    <section>
      <h2>Управляемый</h2>
      <label>
        Поиск <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>{' '}
      <button onClick={() => setQuery('')}>Сбросить</button>
      <p>Состояние: «{query}»</p>
      <CourseList query={query} />
    </section>
  )
}

function UncontrolledFilter() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [applied, setApplied] = useState('')
  const [initial, setInitial] = useState('')

  const apply = () => setApplied(inputRef.current?.value ?? '')

  const reset = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
    setApplied('')
  }

  return (
    <section>
      <h2>Неуправляемый</h2>
      <label>
        Поиск <input ref={inputRef} defaultValue={initial} />
      </label>{' '}
      <button onClick={apply}>Применить</button> <button onClick={reset}>Сбросить</button>{' '}
      <button onClick={() => setInitial('React')}>defaultValue = «React»</button>
      <p>
        Применено: «{applied}», defaultValue: «{initial}»
      </p>
      <CourseList query={applied} />
    </section>
  )
}

export default function App() {
  return (
    <main>
      <ControlledFilter />
      <UncontrolledFilter />
    </main>
  )
}
