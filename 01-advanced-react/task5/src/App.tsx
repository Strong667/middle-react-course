import { useRef, useState } from 'react'
import { Panel } from './Panel'
import coursesData from './data/courses.json'
import type { Category, Course } from './types'

const courses = coursesData as Course[]
const categories: Category[] = ['frontend', 'fullstack', 'quality']

export default function App() {
  const [category, setCategory] = useState<Category | ''>('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectRef = useRef<HTMLSelectElement>(null)

  const resetFilter = () => {
    setCategory('')
    selectRef.current?.focus()
  }

  const visible = category ? courses.filter((c) => c.category === category) : courses

  return (
    <main>
      <Panel
        title="Фильтр"
        actions={category ? <button onClick={resetFilter}>Сбросить</button> : undefined}
      >
        <label>
          Категория{' '}
          <select ref={selectRef} value={category} onChange={(e) => setCategory(e.target.value as Category | '')}>
            <option value="">все</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </Panel>

      {visible.map((course) => (
        <Panel
          key={course.id}
          title={course.title}
          actions={
            course.seats > 0 ? (
              <button onClick={() => setSelectedId(course.id)} aria-pressed={selectedId === course.id}>
                {selectedId === course.id ? 'Выбран' : 'Выбрать'}
              </button>
            ) : undefined
          }
        >
          <p>Категория: {course.category}</p>
          <p>Мест: {course.seats > 0 ? course.seats : 'нет'}</p>
        </Panel>
      ))}
    </main>
  )
}
