import { memo } from 'react'
import type { Course } from './types'

export interface SelectorOptions {
  showSeats: boolean
}

interface CourseSelectorProps {
  courses: Course[]
  selectedIds: string[]
  onSelect: (id: string) => void
  options: SelectorOptions
}

export const CourseSelector = memo(function CourseSelector({
  courses,
  selectedIds,
  onSelect,
  options,
}: CourseSelectorProps) {
  console.log('[render] CourseSelector')
  return (
    <ul>
      {courses.map((c) => (
        <li key={c.id}>
          {c.title}
          {options.showSeats && ` (мест: ${c.seats})`}{' '}
          <button onClick={() => onSelect(c.id)} disabled={selectedIds.includes(c.id)}>
            {selectedIds.includes(c.id) ? 'Выбран' : 'Выбрать'}
          </button>
        </li>
      ))}
    </ul>
  )
})
