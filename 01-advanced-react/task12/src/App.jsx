import { useState } from 'react'
import { CourseListView } from './CourseListView'
import { FavoritesPanel } from './FavoritesPanel'
import { SearchPanel } from './SearchPanel'
import { SelectedCard } from './SelectedCard'
import { useFavorites } from './useFavorites'
import courses from './data/courses.json'

export default function App() {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const favorites = useFavorites()

  const q = search.trim().toLowerCase()
  const visible = courses.filter((c) => c.title.toLowerCase().includes(q))
  const selected = courses.find((c) => c.id === selectedId) ?? null
  const isSelectedVisible = visible.some((c) => c.id === selectedId)
  const favoriteCourses = courses.filter((c) => favorites.ids.includes(c.id))

  return (
    <main>
      <h1>Каталог курсов</h1>
      <SearchPanel search={search} onSearchChange={setSearch} found={visible.length} total={courses.length} />
      <CourseListView
        items={visible}
        selectedId={selectedId}
        favoriteIds={favorites.ids}
        emptyText={`По запросу «${search}» курсов нет`}
        onSelect={setSelectedId}
        onToggleFavorite={favorites.toggle}
      />
      <SelectedCard course={selected} isVisible={isSelectedVisible} onClose={() => setSelectedId(null)} />
      <FavoritesPanel items={favoriteCourses} onClear={favorites.clear} />
    </main>
  )
}
