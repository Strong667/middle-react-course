import coursesData from './data/courses.json'
import type { Course } from './types'

const base = coursesData as Course[]

export const records: readonly Course[] = Object.freeze(
  Array.from({ length: 2000 }, (_, i) => {
    const course = base[i % base.length]
    return Object.freeze({
      ...course,
      id: `${course.id}-${i}`,
      title: `${course.title} №${(i * 7919) % 2000}`,
      seats: (i * 37) % 50,
    })
  }),
)

export type SortKey = 'title' | 'seats'
export type Direction = 'asc' | 'desc'

export function sortCourses(list: readonly Course[], key: SortKey, direction: Direction) {
  const started = performance.now()
  const sign = direction === 'asc' ? 1 : -1
  const result = list.toSorted((a, b) =>
    key === 'title' ? sign * a.title.localeCompare(b.title, 'ru') : sign * (a.seats - b.seats),
  )
  console.log(`[sort] ${key} ${direction} ${(performance.now() - started).toFixed(2)} мс`)
  return result
}
