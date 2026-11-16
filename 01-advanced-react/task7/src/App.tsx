import { useState } from 'react'
import { CatalogContainer } from './CatalogContainer'
import { CourseListView } from './CourseListView'
import coursesData from './data/courses.json'
import type { Course } from './types'

const courses = coursesData as Course[]

export default function App() {
  const [lastCall, setLastCall] = useState<string | null>(null)

  return (
    <main>
      <CatalogContainer />

      <h2>Представление отдельно</h2>
      <p>Последний вызов onSelect: {lastCall ?? 'не было'}</p>
      <h3>Полный список</h3>
      <CourseListView items={courses} emptyText="Курсов нет" onSelect={setLastCall} />
      <h3>Пустой массив</h3>
      <CourseListView items={[]} emptyText="Курсов нет" onSelect={setLastCall} />
    </main>
  )
}
