export function FavoritesPanel({ items, onClear }) {
  return (
    <aside>
      <h2>Избранное: {items.length}</h2>
      {items.length === 0 ? (
        <p>Пусто</p>
      ) : (
        <ul>
          {items.map((c) => (
            <li key={c.id}>{c.title}</li>
          ))}
        </ul>
      )}
      <button onClick={onClear} disabled={items.length === 0}>
        Очистить избранное
      </button>
    </aside>
  )
}
