export function SelectedCard({ course, isVisible, onClose }) {
  if (!course) return <p>Курс не выбран</p>

  return (
    <section>
      <h2>Выбранный курс</h2>
      <p>
        {course.title} — {course.category}, мест: {course.seats}, версия {course.version}
      </p>
      {!isVisible && <p>Этот курс не подходит под текущий поиск, но остаётся выбранным.</p>}
      <button onClick={onClose}>Снять выбор</button>
    </section>
  )
}
