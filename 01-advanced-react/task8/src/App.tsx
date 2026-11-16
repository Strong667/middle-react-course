import { useState } from 'react'
import { CourseListView } from './CourseListView'
import { FilterPanel } from './FilterPanel'
import coursesData from './data/courses.json'
import type { Category, Course } from './types'

const courses = coursesData as Course[]

export default function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | ''>('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const q = search.trim().toLowerCase()
  const items = courses.filter(
    (c) => c.title.toLowerCase().includes(q) && (category === '' || c.category === category),
  )
  const selected = courses.find((c) => c.id === selectedId)

  const reset = () => {
    setSearch('')
    setCategory('')
  }

  return (
    <main>
      <h1>Каталог курсов</h1>
      <FilterPanel
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onReset={reset}
      />
      <p aria-live="polite">
        Найдено: {items.length} из {courses.length}
      </p>
      <p>Выбран: {selected ? selected.title : 'ничего'}</p>
      <CourseListView items={items} emptyText="Нет курсов, подходящих под оба фильтра" onSelect={setSelectedId} />
    </main>
  )
}
