import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { footerNav, legalNav } from '../../data/navigation'
import { Logo } from '../ui/Logo'
import './Footer.scss'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ftr on-night">
      <div className="container-wide">
        <div className="ftr__top">
          {/* --- identity and the details someone actually needs ----------- */}
          <div className="ftr__brand">
            <Link to="/" aria-label="VEITH Gebäudetechnik — zur Startseite">
              <Logo variant="lockup" inverse height={72} />
            </Link>

            <address className="ftr__address">
              <span className="ftr__legal-name">{company.legalName}</span>
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
            </address>

            <dl className="ftr__contact">
              <div>
                <dt>Telefon</dt>
                <dd>
                  <a href={`tel:${company.phone.href}`}>{company.phone.display}</a>
                </dd>
              </div>
              <div>
                <dt>Telefax</dt>
                <dd>{company.fax.display}</dd>
              </div>
              <div>
                <dt>E-Mail</dt>
                <dd>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </dd>
              </div>
            </dl>

            <div className="ftr__hours">
              <p className="ftr__hours-title">Öffnungszeiten</p>
              <ul>
                {company.openingHours.map((h) => (
                  <li key={h.days}>
                    <span>{h.days}</span>
                    <span className="ftr__hours-time">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="ftr__hours-note">{company.appointmentNote}</p>
            </div>
          </div>

          {/* --- sitemap ---------------------------------------------------- */}
          <nav className="ftr__nav" aria-label="Footer">
            {footerNav.map((col) => (
              <div className="ftr__col" key={col.title}>
                <p className="ftr__col-title">{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="ftr__bottom">
          <p className="ftr__copy">
            © {year} {company.legalName}
          </p>

          <ul className="ftr__social">
            {company.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                  <span className="visually-hidden"> (öffnet in neuem Tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="ftr__legal">
            {legalNav.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
