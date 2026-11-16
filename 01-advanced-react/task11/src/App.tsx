import { useFavorites } from './useFavorites'
import coursesData from './data/courses.json'
import type { Course } from './types'

const courses = coursesData as Course[]

interface CourseListProps {
  favoriteIds: string[]
  onToggle: (id: string) => void
}

function CourseList({ favoriteIds, onToggle }: CourseListProps) {
  return (
    <ul>
      {courses.map((c) => {
        const isFavorite = favoriteIds.includes(c.id)
        return (
          <li key={c.id}>
            {c.title}{' '}
            <button onClick={() => onToggle(c.id)} aria-pressed={isFavorite}>
              {isFavorite ? '★ В избранном' : '☆ В избранное'}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

interface FavoritesPanelProps {
  ids: string[]
  onClear: () => void
}

function FavoritesPanel({ ids, onClear }: FavoritesPanelProps) {
  const items = courses.filter((c) => ids.includes(c.id))
  return (
    <aside>
      <h2>Избранное: {ids.length}</h2>
      {items.length === 0 ? (
        <p>Пусто</p>
      ) : (
        <ul>
          {items.map((c) => (
            <li key={c.id}>{c.title}</li>
          ))}
        </ul>
      )}
      <button onClick={onClear} disabled={ids.length === 0}>
        Очистить
      </button>
    </aside>
  )
}

function SeparateHookCall() {
  const { ids, toggle } = useFavorites()
  return (
    <section>
      <h2>Отдельный вызов useFavorites</h2>
      <p>ids этого экземпляра: [{ids.join(', ')}]</p>
      <button onClick={() => toggle('react')}>toggle('react')</button>
    </section>
  )
}

export default function App() {
  const favorites = useFavorites()

  return (
    <main>
      <h1>Каталог</h1>
      <p>ids в App: [{favorites.ids.join(', ')}]</p>
      <CourseList favoriteIds={favorites.ids} onToggle={favorites.toggle} />
      <FavoritesPanel ids={favorites.ids} onClear={favorites.clear} />
      <SeparateHookCall />
    </main>
  )
}
