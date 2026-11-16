import type { Course } from './types'

interface CourseListViewProps {
  items: Course[]
  emptyText: string
  onSelect: (id: string) => void
}

export function CourseListView({ items, emptyText, onSelect }: CourseListViewProps) {
  if (items.length === 0) return <p>{emptyText}</p>

  return (
    <ul>
      {items.map((course) => (
        <li key={course.id}>
          {course.title} ({course.category}, мест: {course.seats}){' '}
          <button onClick={() => onSelect(course.id)}>Выбрать</button>
        </li>
      ))}
    </ul>
  )
}
