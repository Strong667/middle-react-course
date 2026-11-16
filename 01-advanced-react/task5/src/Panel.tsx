import { useId, type ReactNode } from 'react'

interface PanelProps {
  title: ReactNode
  children: ReactNode
  actions?: ReactNode
}

export function Panel({ title, children, actions }: PanelProps) {
  const titleId = useId()
  return (
    <section className="panel" aria-labelledby={titleId}>
      <h2 id={titleId} className="panel-title">
        {title}
      </h2>
      <div className="panel-body">{children}</div>
      {actions ? <div className="panel-actions">{actions}</div> : null}
    </section>
  )
}
