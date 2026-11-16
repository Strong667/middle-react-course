import type { Course } from './types'

interface CourseCardProps {
  course: Course
  isSelected: boolean
  onSelect: (id: string) => void
}

export function CourseCard({ course, isSelected, onSelect }: CourseCardProps) {
  console.log(`[render] CourseCard ${course.id}`)

  return (
    <article>
      <h3>
        {course.title} {isSelected && '(выбран)'}
      </h3>
      <button onClick={() => onSelect(course.id)} disabled={isSelected}>
        Выбрать
      </button>
    </article>
  )
}
