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
    title: 'Bei Störung und Fehlfunktion',
    body: 'Wir sind schnell vor Ort oder helfen am Telefon weiter. Manches ist rasch erledigt, wenn man weiß, was zu tun ist.',
  },
  {
    title: 'Beim Einbau eines neuen Geräts',
    body: 'Wir kommen vorbei und nehmen Maß, bevor bestellt wird. Das schont Ihr Budget ebenso wie Ihre Nerven.',
  },
  {
    title: 'Für Handwerk und Industrie',
    body: 'Sehr schnelle Notfallreaktion — auch ohne Wartungsvertrag.',
  },
]

export function ServiceBlock() {
  return (
    <section className="svc">
      <div className="svc__media" aria-hidden="true">
        <Image src="kundendienst" alt="" fill sizes="40vw" />
      </div>

      <div className="svc__body container-wide">
        <Reveal className="svc__intro">
          <p className="svc__eyebrow">Kundendienst</p>
          <h2 className="svc__title">Wenn die Anlage steht, fängt unsere Arbeit erst an.</h2>
          <p className="svc__lead">
            Service und Kundendienst sind die Basis für eine gute Partnerschaft. Wir
            halten Ihre Gebäudetechnik am Laufen — zuverlässig und schnell.
          </p>
        </Reveal>

        <Reveal className="svc__dispatch" delay={60}>
          <a className="svc__call" href={`tel:${company.phone.href}`}>
            <span className="svc__call-text">
              <span className="svc__call-label">Während unserer Geschäftszeiten erreichbar</span>
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
