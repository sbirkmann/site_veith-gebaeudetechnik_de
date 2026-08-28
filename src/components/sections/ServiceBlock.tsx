import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { Image } from '../ui/Image'
import { company } from '../../data/company'
import './ServiceBlock.scss'

/**
 * The Kundendienst as its own conversion moment.
 *
 * Someone whose heating has failed is not browsing — they need the number and
 * the opening hours, immediately. So the phone number is the largest element
 * here and everything else is secondary. The three cases below it are the ones
 * the existing /service/kundendienst/ page names.
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
    <section className="svc section">
      <div className="container-wide">
        <div className="svc__panel">
          <div className="svc__media" aria-hidden="true">
            <Image
              src="kundendienst"
              alt=""
              ratio="3 / 4"
              sizes="(min-width: 62rem) 24rem, 100vw"
            />
          </div>

          <div className="svc__body">
            <Reveal>
              <p className="svc__eyebrow">Kundendienst</p>
              <h2 className="svc__title">
                Wenn die Anlage steht, fängt unsere Arbeit erst an.
              </h2>
              <p className="svc__lead">
                Service und Kundendienst sind die Basis für eine gute Partnerschaft.
                Wir halten Ihre Gebäudetechnik am Laufen — zuverlässig und schnell.
              </p>

              {/* The number is the point of this section. */}
              <a className="svc__call" href={`tel:${company.phone.href}`}>
                <span className="svc__call-label">
                  Während unserer Geschäftszeiten erreichbar
                </span>
                <span className="svc__call-num">{company.phone.display}</span>
              </a>

              <ul className="svc__hours">
                {company.openingHours.map((h) => (
                  <li key={h.days}>
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="svc__cases" delay={90}>
              <ul>
                {cases.map((c) => (
                  <li key={c.title}>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </li>
                ))}
              </ul>
              <Link className="svc__more" to="/service/kundendienst">
                Zum Kundendienst
                <svg viewBox="0 0 20 12" aria-hidden="true" focusable="false">
                  <path
                    d="M0 6h17.5M12.5 1l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
