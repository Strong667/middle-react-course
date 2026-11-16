import { useRef } from 'react'
import type { Category } from './types'

const categories: Category[] = ['frontend', 'fullstack', 'quality']

interface FilterPanelProps {
  search: string
  category: Category | ''
  onSearchChange: (value: string) => void
  onCategoryChange: (value: Category | '') => void
  onReset: () => void
}

export function FilterPanel({ search, category, onSearchChange, onCategoryChange, onReset }: FilterPanelProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  const handleReset = () => {
    onReset()
    searchRef.current?.focus()
  }

  return (
    <fieldset>
      <legend>Фильтры</legend>
      <label>
        Название <input ref={searchRef} value={search} onChange={(e) => onSearchChange(e.target.value)} />
      </label>{' '}
      <label>
        Категория{' '}
        <select value={category} onChange={(e) => onCategoryChange(e.target.value as Category | '')}>
          <option value="">все</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>{' '}
      <button onClick={handleReset} disabled={!search && !category}>
        Сбросить фильтры
      </button>
    </fieldset>
  )
}
