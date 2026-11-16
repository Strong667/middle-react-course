import { useEffect, useRef } from 'react'

let activeObservers = 0

interface ChildProps {
    title: string
}

export function Child({ title }: ChildProps) {
    const rootRef = useRef<HTMLElement>(null)

    console.log(`[render] Child title="${title}"`)

    useEffect(() => {
        const node = rootRef.current
        if (!node) return

        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                const value = m.type === 'characterData' ? m.target.textContent : node.textContent
                console.log(`[DOM] ${m.type}: "${value}"`)
            }
        })
        observer.observe(node, {
            subtree: true,
            childList: true,
            characterData: true,
            attributes: true,
        })
        activeObservers += 1
        console.log(`[observer] connected, active = ${activeObservers}`)

        return () => {
            observer.disconnect()
            activeObservers -= 1
            console.log(`[observer] disconnected, active = ${activeObservers}`)
        }
    }, [])

    return (
        <section ref={rootRef}>
            <h2>{title}</h2>
            <p>Постоянный текст ребёнка: он не зависит от счётчика родителя.</p>
        </section>
    )
}
