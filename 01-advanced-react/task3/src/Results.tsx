import { memo } from 'react'

interface Item {
  id: string
  title: string
}

const items: Item[] = Array.from({ length: 240 }, (_, i) => ({
  id: String(i),
  title: ['React', 'CSS', 'TypeScript'][i % 3] + ' ' + i,
}))

function CourseCard({ item, query }: { item: Item; query: string }) {
  let checksum = item.id.length + query.length
  for (let i = 0; i < 80000; i++) checksum = (Math.imul(checksum, 31) + i) | 0
  return (
    <li>
      {item.title} — {checksum}
    </li>
  )
}

export const Results = memo(function Results({ query }: { query: string }) {
  return (
    <ul>
      {items
        .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
        .map((item) => (
          <CourseCard key={item.id} item={item} query={query} />
        ))}
    </ul>
  )
})
