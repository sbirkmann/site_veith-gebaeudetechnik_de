import { Reveal } from '../ui/Reveal'
import { Image } from '../ui/Image'
import { Button } from '../ui/Button'
import { IconPhone, IconPin } from '../ui/lineIcons'
import { company } from '../../data/company'
import './KontaktCta.scss'

interface KontaktCtaProps {
  title?: string
  lead?: string
}

/**
 * Closing contact band. Mist only as a thin frame so the split sits
 * against the navy footer without merging. Orange stays on the panel.
 * Opening hours live on /kontakt and Kundendienst — not here.
 */
export function KontaktCta({
  title = 'Reden wir über Ihr Gebäude.',
  lead = 'Ein Anruf genügt, um herauszufinden, ob und wie sich Ihr Vorhaben rechnet. Wir nehmen uns die Zeit.',
}: KontaktCtaProps) {
  return (
    <section className="kcta">
      <div className="container-wide">
        <Reveal className="kcta__split">
          <div className="kcta__media" aria-hidden="true">
            <Image
              src="kompetenzzentrum-aussen"
              alt=""
              fill
              sizes="(min-width: 56rem) 40vw, 100vw"
              position="42% 70%"
            />
          </div>

          <div className="kcta__text">
            <p className="kcta__eyebrow">Kontakt</p>
            <h2 className="kcta__title">{title}</h2>
            <p className="kcta__lead">{lead}</p>
            <p className="kcta__place">
              <IconPin className="kcta__pin" />
              <span className="kcta__addr">
                <span className="kcta__street">{company.address.street}</span>
                <span className="kcta__locality">
                  {company.address.postalCode} {company.address.city}
                </span>
              </span>
            </p>
          </div>

          <div className="kcta__panel">
            <IconPhone className="kcta__icon" />
            <a className="kcta__phone" href={`tel:${company.phone.href}`}>
              {company.phone.display}
            </a>
            <a className="kcta__mail" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <div className="kcta__actions">
              <Button to="/kontakt" variant="secondary" arrow>
                Ansprechpartner finden
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
