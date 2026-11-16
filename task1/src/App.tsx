import { useState } from 'react'
import coursesData from './data/courses.json'
import type { Course } from './types'
import { Child } from './Child'

const courses = coursesData as Course[]

export default function App() {
  const [count, setCount] = useState(0)
  const [courseIndex, setCourseIndex] = useState(0)
  const [showChild, setShowChild] = useState(true)

  console.log(`[render] Parent count=${count}`)

  const nextCourse = () => setCourseIndex((i) => (i + 1) % courses.length)

  return (
      <main>
        <h1>Render и DOM</h1>
        <p>Счётчик родителя: {count}</p>

        <button onClick={() => setCount((c) => c + 1)}>Счётчик +1</button>{' '}
        <button onClick={nextCourse}>Сменить title ребёнка</button>{' '}
        <button onClick={() => setShowChild((s) => !s)}>
          {showChild ? 'Размонтировать ребёнка' : 'Смонтировать ребёнка'}
        </button>

        <hr />
        {showChild && <Child title={courses[courseIndex].title} />}
      </main>
  )
}
