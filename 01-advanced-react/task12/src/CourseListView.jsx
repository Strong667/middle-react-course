export function CourseListView({ items, selectedId, favoriteIds, emptyText, onSelect, onToggleFavorite }) {
  if (items.length === 0) return <p>{emptyText}</p>

  return (
    <ul>
      {items.map((course) => {
        const isFavorite = favoriteIds.includes(course.id)
        const isSelected = course.id === selectedId
        return (
          <li key={course.id}>
            {isSelected ? <b>{course.title}</b> : course.title} ({course.category}){' '}
            <button onClick={() => onSelect(course.id)} aria-pressed={isSelected}>
              {isSelected ? 'Выбран' : 'Выбрать'}
            </button>{' '}
            <button onClick={() => onToggleFavorite(course.id)} aria-pressed={isFavorite}>
              {isFavorite ? '★' : '☆'}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
