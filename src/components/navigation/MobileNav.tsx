import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { primaryNav, legalNav } from '../../data/navigation'
import { company } from '../../data/company'
import './MobileNav.scss'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

/**
 * Full-screen navigation for narrow viewports.
 *
 * Groups with children collapse into accordions rather than pushing everything
 * onto one long list. While it is open the page behind cannot scroll, focus is
 * kept inside the panel, and Escape closes it — the three things that make an
 * overlay usable by keyboard.
 */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<number | null>(0)
  const panelRef = useRef<HTMLDivElement>(null)

  /* Lock the page behind the overlay, compensating for the scrollbar so the
     layout does not jump sideways as it disappears. */
  useEffect(() => {
    if (!open) return
    const { body } = document
    const gap = window.innerWidth - document.documentElement.clientWidth
    const prev = { overflow: body.style.overflow, padding: body.style.paddingRight }
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prev.overflow
      body.style.paddingRight = prev.padding
    }
  }, [open])

  /* Escape closes; Tab cycles within the panel. */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  /* Move focus into the panel when it opens so the next Tab lands inside. */
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
  }, [open])

  return (
    <div
      className={`mnav${open ? ' is-open' : ''}`}
      id="mobile-nav"
      // Hidden from assistive tech and from the tab order when closed.
      inert={!open}
      aria-hidden={!open}
    >
      <div className="mnav__panel" ref={panelRef}>
        <nav aria-label="Hauptnavigation (mobil)">
          <ul className="mnav__list">
            {primaryNav.map((group, i) => {
              const panel = group.columns ?? (group.links ? [{ links: group.links }] : null)
              const isOpen = expanded === i

              if (!panel) {
                return (
                  <li key={group.label} className="mnav__item">
                    <Link className="mnav__top" to={group.to!} onClick={onClose}>
                      {group.label}
                    </Link>
                  </li>
                )
              }

              return (
                <li key={group.label} className="mnav__item">
                  <button
                    type="button"
                    className={`mnav__top mnav__toggle${isOpen ? ' is-open' : ''}`}
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    {group.label}
                    <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                      <path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>

                  <div className="mnav__sub" hidden={!isOpen}>
                    {group.to && (
                      <Link className="mnav__sub-all" to={group.to} onClick={onClose}>
                        Übersicht {group.label}
                      </Link>
                    )}
                    {panel.map((col, ci) => (
                      <ul key={ci}>
                        {col.links.map((l) => (
                          <li key={l.to + l.label}>
                            <Link className="mnav__sub-link" to={l.to} onClick={onClose}>
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mnav__foot">
          <a className="mnav__call" href={`tel:${company.phone.href}`}>
            <span className="mnav__call-label">Kundendienst anrufen</span>
            <span className="mnav__call-num">{company.phone.display}</span>
          </a>
          <ul className="mnav__legal">
            {legalNav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={onClose}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
