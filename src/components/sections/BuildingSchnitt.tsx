import { Link } from 'react-router-dom'
import { company } from '../../data/company'
import { trades } from '../../data/leistungen'
import { Image } from '../ui/Image'
import './BuildingSchnitt.scss'

const depth = {
  energie: 'Dach',
  heizung: 'Technikraum',
  klima: 'Räume',
  sanitaer: 'Schacht',
  elektro: 'überall',
} as const

/**
 * Photographic cutaway of a building: the five trades as depth, not a second
 * menu. Names and routes come from the Leistungsdaten.
 */
export function BuildingSchnitt() {
  return (
    <figure className="schnitt">
      <p className="schnitt__stamp">
        <span>Schnitt A–A</span>
        <span>
          {company.founded} · {company.address.city}
        </span>
      </p>

      <div className="schnitt__media">
        <Image
          src="gebaeude-schnitt"
          alt="Schematischer Gebäudeschnitt: fünf Gewerke"
          sizes="(min-width: 72rem) 28vw, (min-width: 40rem) 45vw, 92vw"
          priority
        />
      </div>

      <ol className="schnitt__legend">
        {trades.map((t, i) => (
          <li key={t.id}>
            <Link to={`/leistungen/${t.slug}`}>
              <span className="schnitt__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="schnitt__name">{t.name}</span>
              <span className="schnitt__depth">{depth[t.id]}</span>
            </Link>
          </li>
        ))}
      </ol>
    </figure>
  )
}
