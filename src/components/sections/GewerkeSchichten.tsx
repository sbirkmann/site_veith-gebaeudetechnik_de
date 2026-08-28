import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { trades } from '../../data/leistungen'
import { Image } from '../ui/Image'
import './GewerkeSchichten.scss'

/**
 * The five Leistungsbereiche as strata of a building section.
 *
 * This is the site's signature element, and it earns its place by encoding
 * something true: the trades are not five parallel services but five layers
 * that sit at different depths of a building — energy on the roof, heat and
 * air in the plant room, water in the shafts, current everywhere. Selecting a
 * layer shows what VEITH does at that depth.
 *
 * It is a tab set underneath: one tablist, arrow-key navigation, one panel
 * visible at a time. On narrow screens the strata stack and the panel follows
 * the selected one.
 */
export function GewerkeSchichten() {
  const [active, setActive] = useState(0)
  const baseId = useId()

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = trades.length - 1
    let next: number | null = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  const trade = trades[active]

  return (
    <div className="schichten">
      {/* --- the section: one stratum per trade -------------------------- */}
      <div
        className="schichten__stack"
        role="tablist"
        aria-orientation="vertical"
        aria-label="Leistungsbereiche"
        onKeyDown={onKeyDown}
      >
        {trades.map((t, i) => {
          const selected = i === active
          return (
            <button
              key={t.id}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`schichten__layer${selected ? ' is-active' : ''}`}
              style={{ '--layer-accent': t.accent } as React.CSSProperties}
              onClick={() => setActive(i)}
            >
              <span className="schichten__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="schichten__name">{t.name}</span>
              <span className="schichten__note">{t.eyebrow}</span>
              <span className="schichten__bar" aria-hidden="true" />
            </button>
          )
        })}
      </div>

      {/* --- what happens at that depth ---------------------------------- */}
      <div
        className="schichten__panel"
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        style={{ '--layer-accent': trade.accent } as React.CSSProperties}
      >
        <div className="schichten__media">
          {/* Prefer a topic photo so the home hero is not repeated here. */}
          <Image
            key={(trade.topics[0]?.image ?? trade.hero).src}
            src={(trade.topics[0]?.image ?? trade.hero).src}
            alt={(trade.topics[0]?.image ?? trade.hero).alt}
            ratio="4 / 3"
            sizes="(min-width: 62rem) 42rem, 100vw"
          />
        </div>

        <div className="schichten__body">
          <p className="schichten__meta">
            <span>{String(active + 1).padStart(2, '0')}</span>
            {trade.eyebrow}
          </p>
          <h3 className="schichten__title">{trade.headline}</h3>
          <p className="schichten__lead">{trade.summary}</p>

          <ol className="schichten__scope">
            {trade.scope.map((s, i) => (
              <li key={s}>
                <span className="schichten__scope-i" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="schichten__scope-name">{s}</span>
              </li>
            ))}
          </ol>

          <Link className="schichten__link" to={`/leistungen/${trade.slug}`}>
            {trade.name} im Detail
            <svg viewBox="0 0 20 12" aria-hidden="true" focusable="false">
              <path d="M0 6h17.5M12.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.15" vectorEffect="nonScalingStroke" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
