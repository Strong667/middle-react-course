import { useState } from 'react'
import { CourseListView } from './CourseListView'
import coursesData from './data/courses.json'
import type { Course } from './types'

const courses = coursesData as Course[]

export function CatalogContainer() {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const q = search.trim().toLowerCase()
  const items = courses.filter((c) => c.title.toLowerCase().includes(q))
  const selected = courses.find((c) => c.id === selectedId)

  return (
    <section>
      <h2>Каталог</h2>
      <label>
        Поиск <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <p>Выбран: {selected ? selected.title : 'ничего'}</p>
      <CourseListView items={items} emptyText={`По запросу «${search}» курсов нет`} onSelect={setSelectedId} />
    </section>
  )
}
