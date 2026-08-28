import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { trades } from '../data/leistungen'
import { company } from '../data/company'
import './NotFound.scss'

/**
 * 404.
 *
 * A dead end is a navigation failure, so this page's job is to get the visitor
 * moving again: the five trades, the phone number, and the way home.
 */
export default function NotFound() {
  useSeo({
    title: 'Seite nicht gefunden',
    description:
      'Diese Seite gibt es nicht (mehr). Hier finden Sie die Leistungsbereiche von VEITH Gebäudetechnik und den direkten Kontakt.',
    path: '/404',
  })

  return (
    <section className="nf">
      <div className="container-wide">
        <p className="nf__code">404</p>
        <h1 className="nf__title">Diese Seite gibt es nicht.</h1>
        <p className="nf__lead">
          Möglicherweise hat sich die Adresse geändert. Von hier kommen Sie
          weiter — oder Sie rufen einfach an.
        </p>

        <nav className="nf__nav" aria-label="Leistungsbereiche">
          <p className="nf__nav-title">Leistungsbereiche</p>
          <ul>
            {trades.map((t) => (
              <li key={t.id}>
                <Link
                  to={`/leistungen/${t.slug}`}
                  style={{ '--accent': t.accent } as React.CSSProperties}
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nf__actions">
          <Link className="btn btn--primary btn--lg" to="/">
            <span className="btn__label">Zur Startseite</span>
          </Link>
          <a className="btn btn--secondary btn--lg" href={`tel:${company.phone.href}`}>
            <span className="btn__label">{company.phone.display}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
