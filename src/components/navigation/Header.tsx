import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '../../data/navigation'
import { company } from '../../data/company'
import { Logo } from '../ui/Logo'
import { MobileNav } from './MobileNav'
import './Header.scss'

function pathOf(to: string) {
  return to.split('#')[0]
}

function groupIsCurrent(
  group: (typeof primaryNav)[number],
  pathname: string,
) {
  const urls = [
    group.to,
    ...(group.links?.map((l) => l.to) ?? []),
    ...(group.columns?.flatMap((c) => c.links.map((l) => l.to)) ?? []),
  ].filter(Boolean) as string[]

  return urls.some((to) => {
    const p = pathOf(to)
    if (!p || p === '/') return pathname === '/'
    return pathname === p || pathname.startsWith(`${p}/`)
  })
}

/**
 * Sticky site header.
 *
 * Desktop: lockup, one set of nav links, phone. Groups with children open a
 * full-width panel. Keyboard: aria-expanded, Escape, focus-leave.
 */
export function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number>(undefined)
  const location = useLocation()

  const desktopNav = primaryNav

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

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 160)
  }
  const cancelClose = () => window.clearTimeout(closeTimer.current)

  return (
    <>
      <header
        className={`hdr${openIndex !== null ? ' is-open' : ''}`}
      >
        <div className="hdr__inner container-wide">
          <Link className="hdr__logo" to="/" aria-label="VEITH Gebäudetechnik — zur Startseite">
            <Logo variant="lockup" height={44} />
          </Link>

          <nav className="hdr__nav" aria-label="Hauptnavigation" ref={navRef}>
            <ul className="hdr__list">
              {desktopNav.map((group, i) => {
                const panel = group.columns ?? (group.links ? [{ links: group.links }] : null)
                const open = openIndex === i
                const current = groupIsCurrent(group, location.pathname)

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
                      className={`hdr__link${current ? ' is-active' : ''}`}
                      aria-expanded={open}
                      onClick={() => setOpenIndex(open ? null : i)}
                    >
                      {group.label}
                    </button>

                    <div
                      className="hdr__panel"
                      hidden={!open}
                      onPointerEnter={cancelClose}
                      onPointerLeave={scheduleClose}
                    >
                      <div className="hdr__panel-inner container-wide">
                        {group.to && (
                          <Link className="hdr__panel-all" to={group.to}>
                            Alle {group.label}
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
              {company.phone.display}
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
