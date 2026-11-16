export function SearchPanel({ search, onSearchChange, found, total }) {
  return (
    <fieldset>
      <legend>Поиск</legend>
      <label>
        Название <input value={search} onChange={(e) => onSearchChange(e.target.value)} />
      </label>{' '}
      <button onClick={() => onSearchChange('')} disabled={!search}>
        Очистить поиск
      </button>
      <p aria-live="polite">
        Найдено: {found} из {total}
      </p>
    </fieldset>
  )
}
