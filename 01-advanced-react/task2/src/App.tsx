import { useState } from 'react'
import coursesData from './data/courses.json'
import type { Course } from './types'
import { CourseCard } from './CourseCard'

const courses = coursesData as Course[]
const STORAGE_KEY = 'selected-course'

export default function App() {
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem(STORAGE_KEY))
  const [renders, setRenders] = useState(0)

  const handleSelect = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id)
    console.log(`[write] ${STORAGE_KEY} = ${id}`)
    setSelectedId(id)
  }

  return (
    <main>
      <h1>Выбор курса</h1>
      <p>
        localStorage[{STORAGE_KEY}]: {selectedId ?? 'пусто'}
      </p>
      <button onClick={() => setRenders((n) => n + 1)}>Перерисовать ({renders})</button>
      <hr />
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isSelected={course.id === selectedId}
          onSelect={handleSelect}
        />
      ))}
    </main>
  )
}
