import { Link } from 'react-router-dom'
import { Image } from '../ui/Image'
import { Button } from '../ui/Button'
import { company } from '../../data/company'
import { trades } from '../../data/leistungen'
import './Hero.scss'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <Image
          src="montage-photovoltaik-dach"
          alt="Zwei Monteure von VEITH montieren Photovoltaikmodule auf einem Ziegeldach"
          priority
          fill
          sizes="100vw"
          position="72% 38%"
        />
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="hero__inner container-wide">
        <p className="hero__eyebrow">
          <span className="hero__since">Seit {company.founded}</span>
          <span className="hero__place">Gebäudetechnik · Bühl / Baden</span>
        </p>

        <h1 className="hero__title">
          Fünf Gewerke, ein Gebäude,
          <br />
          <span className="hero__title-accent">ein Plan.</span>
        </h1>

        <p className="hero__lead">
          Energie, Heizung, Klima, Sanitär und Elektro aus einem Haus — geplant
          und installiert von Leuten, die wissen, wie die Gewerke ineinandergreifen.
          Seit {company.founded} in Bühl.
        </p>

        <div className="hero__actions">
          <Button to="/leistungen" size="lg" arrow>
            Was wir bauen
          </Button>
          <Button href={`tel:${company.phone.href}`} variant="secondary" size="lg">
            {company.phone.display}
          </Button>
        </div>
      </div>

      <nav className="hero__trades" aria-label="Leistungsbereiche">
        <ul className="container-wide">
          {trades.map((t, i) => (
            <li key={t.id}>
              <Link
                to={`/leistungen/${t.slug}`}
                style={{ '--accent': t.accent } as React.CSSProperties}
              >
                <span className="hero__trade-i" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
