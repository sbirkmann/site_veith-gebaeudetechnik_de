import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { company } from '../../data/company'
import './KontaktCta.scss'

interface KontaktCtaProps {
  /** Overrides for pages where a more specific ask makes sense. */
  title?: string
  lead?: string
  /** Accent for the rule, so a trade page keeps its own colour here. */
  accent?: string
}

/**
 * The closing call to action.
 *
 * Deliberately offers exactly two ways in — phone and e-mail — because the
 * existing site publishes those and nothing else. No form promises here that
 * the contact page does not keep.
 */
export function KontaktCta({
  title = 'Reden wir über Ihr Gebäude.',
  lead = 'Ein Anruf genügt, um herauszufinden, ob und wie sich Ihr Vorhaben rechnet. Wir nehmen uns die Zeit.',
  accent,
}: KontaktCtaProps) {
  return (
    <section className="kcta on-night">
      <div className="container-wide">
        <Reveal className="kcta__inner">
          <span
            className="kcta__rule"
            style={accent ? { backgroundColor: accent } : undefined}
            aria-hidden="true"
          />
          <div className="kcta__text">
            <h2 className="kcta__title">{title}</h2>
            <p className="kcta__lead">{lead}</p>
          </div>

          <div className="kcta__contact">
            <a className="kcta__phone" href={`tel:${company.phone.href}`}>
              {company.phone.display}
            </a>
            <a className="kcta__mail" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <div className="kcta__actions">
              <Button to="/kontakt" arrow>
                Ansprechpartner finden
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
