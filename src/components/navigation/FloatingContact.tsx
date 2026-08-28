import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company } from '../../data/company'
import { IconMail, IconPerson, IconPhone } from '../ui/lineIcons'
import './FloatingContact.scss'

function hideOn(pathname: string) {
  return pathname === '/kontakt' || pathname === '/impressum' || pathname === '/datenschutz'
}

/**
 * Fixed contact cluster. Parks when a contact band or the footer is in view,
 * and stays off pages that already are the contact.
 */
export function FloatingContact() {
  const { pathname } = useLocation()
  const [parked, setParked] = useState(false)
  const hidden = hideOn(pathname)

  useEffect(() => {
    if (hidden) {
      setParked(false)
      return
    }
    const targets = [...document.querySelectorAll('footer, .kcta')]
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        setParked(entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.18))
      },
      { threshold: [0, 0.18, 0.4] },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [hidden, pathname])

  if (hidden) return null

  return (
    <nav
      className={`flt${parked ? ' is-parked' : ''}`}
      aria-label="Kontakt aufnehmen"
      aria-hidden={parked}
    >
      <a
        className="flt__btn flt__btn--call"
        href={`tel:${company.phone.href}`}
        aria-label={`Anrufen: ${company.phone.display}`}
        tabIndex={parked ? -1 : 0}
      >
        <IconPhone />
      </a>
      <a
        className="flt__btn"
        href={`mailto:${company.email}`}
        aria-label={`E-Mail an ${company.email}`}
        tabIndex={parked ? -1 : 0}
      >
        <IconMail />
      </a>
      <Link
        className="flt__btn"
        to="/kontakt"
        aria-label="Zur Kontaktseite"
        tabIndex={parked ? -1 : 0}
      >
        <IconPerson />
      </Link>
    </nav>
  )
}
