import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '../../data/navigation'
import { company } from '../../data/company'
import { Logo } from '../ui/Logo'
import { MobileNav } from './MobileNav'
import './Header.scss'

/**
 * Sticky site header.
 *
 * Desktop: a horizontal bar; groups that have children open a panel on hover
 * and on focus, and close on Escape or when focus leaves the group. Each
 * trigger is a real button with aria-expanded, so the panel is reachable and
 * announceable by keyboard alone — the top-level destination stays available
 * as the first link inside the panel.
 *
 * Below 1100px the bar collapses to a single menu button; see MobileNav.
 */
export function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number>(undefined)
  const location = useLocation()

  /* The header gains a ground and a hairline once the page moves, so it never
     sits invisibly on top of a light hero. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Any navigation closes whatever was open. */
  useEffect(() => {
    setOpenIndex(null)
    setMobileOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  /* Pointer leaves are delayed so a diagonal path from trigger to panel does
     not close it out from under the cursor. */
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 140)
  }
  const cancelClose = () => window.clearTimeout(closeTimer.current)

  return (
    <>
      <header className={`hdr${scrolled ? ' is-scrolled' : ''}`}>
        <div className="hdr__inner container-wide">
          <Link className="hdr__logo" to="/" aria-label="VEITH Gebäudetechnik — zur Startseite">
            <Logo variant="wordmark" height={34} />
          </Link>

          <nav className="hdr__nav" aria-label="Hauptnavigation" ref={navRef}>
            <ul className="hdr__list">
              {primaryNav.map((group, i) => {
                const panel = group.columns ?? (group.links ? [{ links: group.links }] : null)
                const open = openIndex === i

                if (!panel) {
                  return (
                    <li key={group.label} className="hdr__item">
                      <NavLink
                        to={group.to!}
                        className={({ isActive }) =>
                          `hdr__link${isActive ? ' is-active' : ''}`
                        }
                      >
                        {group.label}
                      </NavLink>
                    </li>
                  )
                }

                return (
                  <li
                    key={group.label}
                    className={`hdr__item hdr__item--has-panel${open ? ' is-open' : ''}`}
                    onPointerEnter={() => {
                      cancelClose()
                      setOpenIndex(i)
                    }}
                    onPointerLeave={scheduleClose}
                    onFocus={() => setOpenIndex(i)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setOpenIndex(null)
                      }
                    }}
                  >
                    <button
                      type="button"
                      className="hdr__link hdr__trigger"
                      aria-expanded={open}
                      onClick={() => setOpenIndex(open ? null : i)}
                    >
                      {group.label}
                      <svg
                        className="hdr__chev"
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                      </svg>
                    </button>

                    <div className="hdr__panel" hidden={!open}>
                      <div className="hdr__panel-inner">
                        {group.to && (
                          <Link className="hdr__panel-all" to={group.to}>
                            {group.label} — Übersicht
                          </Link>
                        )}
                        <div className="hdr__cols">
                          {panel.map((col, ci) => (
                            <div className="hdr__col" key={ci}>
                              {col.title && <p className="hdr__col-title">{col.title}</p>}
                              <ul>
                                {col.links.map((l) => (
                                  <li key={l.to + l.label}>
                                    <Link className="hdr__panel-link" to={l.to}>
                                      <span className="hdr__panel-label">{l.label}</span>
                                      {l.hint && (
                                        <span className="hdr__panel-hint">{l.hint}</span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hdr__actions">
            <a className="hdr__phone" href={`tel:${company.phone.href}`}>
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path
                  d="M3.2 1.6h2.4l1.2 3-1.5 1.1a9 9 0 004.2 4.2l1.1-1.5 3 1.2v2.4a1 1 0 01-1.1 1A11.6 11.6 0 012.2 2.7a1 1 0 011-1.1z"
                  fill="currentColor"
                />
              </svg>
              <span className="hdr__phone-num">{company.phone.display}</span>
            </a>

            <button
              type="button"
              className="hdr__burger"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="visually-hidden">
                {mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
              </span>
              <span className={`hdr__burger-box${mobileOpen ? ' is-open' : ''}`} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
