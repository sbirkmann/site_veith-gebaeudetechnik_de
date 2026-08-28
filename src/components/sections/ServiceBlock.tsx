import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { Image } from '../ui/Image'
import { IconPhone } from '../ui/lineIcons'
import { company } from '../../data/company'
import './ServiceBlock.scss'

/**
 * Homepage Kundendienst band. Phone only — opening hours live on
 * /kontakt and /service/kundendienst.
 */

const cases = [
  {
    title: 'Störung',
    body: 'Wir kommen vor Ort oder sagen am Telefon, was als Nächstes zu tun ist.',
  },
  {
    title: 'Gerätetausch',
    body: 'Maß nehmen, bevor bestellt wird — sonst passt das Gerät nicht in die Nische.',
  },
  {
    title: 'Handwerk und Industrie',
    body: 'Schnelle Reaktion, auch ohne Wartungsvertrag.',
  },
]

export function ServiceBlock() {
  return (
    <section className="svc">
      <div className="svc__body container-wide">
        <Reveal className="svc__intro">
          <p className="svc__eyebrow">Kundendienst</p>
          <h2 className="svc__title">Wenn die Anlage steht, rufen Sie an.</h2>
          <p className="svc__lead">
            Störungen, Einbau, Notfall im Betrieb: unter dieser Nummer erreichen
            Sie uns während der Geschäftszeiten.
          </p>
        </Reveal>

        <Reveal className="svc__media">
          <Image
            src="kundendienst"
            alt="Servicemonteur von VEITH mit Werkzeugkoffer im Einsatz beim Kunden"
            fill
            sizes="(min-width: 62rem) 36vw, 100vw"
            position="42% 40%"
          />
        </Reveal>

        <Reveal className="svc__dispatch" delay={60}>
          <a className="svc__call" href={`tel:${company.phone.href}`}>
            <span className="svc__call-text">
              <span className="svc__call-label">Während der Geschäftszeiten</span>
              <span className="svc__call-num">{company.phone.display}</span>
            </span>
            <IconPhone className="svc__call-icon" />
          </a>
        </Reveal>

        <Reveal className="svc__cases" delay={90}>
          <ul>
            {cases.map((c, i) => (
              <li key={c.title}>
                <span className="svc__case-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Link className="svc__more" to="/service/kundendienst">
          Zum Kundendienst
          <svg viewBox="0 0 20 12" aria-hidden="true" focusable="false">
            <path
              d="M0 6h17.5M12.5 1l5 5-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
              vectorEffect="nonScalingStroke"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}
