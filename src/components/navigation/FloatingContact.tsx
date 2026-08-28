import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { IconMail, IconPerson, IconPhone } from '../ui/lineIcons'
import './FloatingContact.scss'

/**
 * Fixed contact cluster: call, mail, contact page.
 * Extra to the header phone — never a substitute for it.
 */
export function FloatingContact() {
  return (
    <nav className="flt" aria-label="Kontakt aufnehmen">
      <a
        className="flt__btn flt__btn--call"
        href={`tel:${company.phone.href}`}
        aria-label={`Anrufen: ${company.phone.display}`}
      >
        <IconPhone />
      </a>
      <a
        className="flt__btn"
        href={`mailto:${company.email}`}
        aria-label={`E-Mail an ${company.email}`}
      >
        <IconMail />
      </a>
      <Link className="flt__btn" to="/kontakt" aria-label="Zur Kontaktseite">
        <IconPerson />
      </Link>
    </nav>
  )
}
