import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { Image } from '../components/ui/Image'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import './Lebensraeume.scss'

/**
 * Lebensräume.
 *
 * The most visual of the six: the showroom is a room, so the page is built
 * around the two photographs of it rather than around text. A full-bleed
 * opening shot, the five areas of the flat as a walk-through list beside the
 * detail shot, and a closing invitation to come and stand in it.
 */

const areas = [
  {
    id: 'gebaeudetechnik',
    title: 'Gebäudetechnik',
    body: 'Wie Heizung, Lüftung, Beschattung und Sicherheit in einer Wohnung zusammenspielen, wenn sie von Anfang an zusammen geplant werden.',
  },
  {
    id: 'beleuchtung',
    title: 'Beleuchtung',
    body: 'Licht für Arbeiten, Essen und Abend — geschaltet, gedimmt und in Szenen gelegt, an denselben Stellen, an denen Sie es zuhause bräuchten.',
  },
  {
    id: 'vernetzung',
    title: 'Vernetzung',
    body: 'Was die Technik untereinander austauscht, wie sie bedient wird und was davon auch dann noch funktioniert, wenn kein Telefon in der Hand ist.',
  },
  {
    id: 'klimatechnik',
    title: 'Klimatechnik',
    body: 'Kühlen und Temperieren im Wohnbereich: wo die Geräte sitzen, wie laut sie sind und wie wenig man sie im Betrieb bemerkt.',
  },
  {
    id: 'altersgerecht',
    title: 'Altersgerechtes Wohnen',
    body: 'Lösungen, die eine Wohnung länger benutzbar machen — sichtbar eingebaut, damit Sie beurteilen können, wie sie sich im Alltag anfühlen.',
  },
] as const

export default function Lebensraeume() {
  useSeo({
    title: 'Lebensräume — der Showroom im Kompetenzzentrum',
    description:
      'Der Showroom „Lebensräume“ im VEITH Kompetenzzentrum in Bühl ist als Wohnung aufgebaut und zeigt Gebäudetechnik, Beleuchtung, Vernetzung, Klimatechnik und altersgerechtes Wohnen zum Anfassen.',
    path: '/service/lebensraeume',
    image: 'lebensraeume-showroom',
  })

  return (
    <>
      {/* --------------------------------------------------- opening shot */}
      <header className="lbr__hero">
        <div className="lbr__hero-media">
          <Image
            src="lebensraeume-showroom"
            alt="Der als Wohnung aufgebaute Showroom Lebensräume im VEITH Kompetenzzentrum mit Wohnbereich und indirekter Beleuchtung"
            ratio="16 / 9"
            sizes="100vw"
            priority
          />
        </div>

        <div className="container-wide">
          <div className="lbr__hero-text">
            <span className="lbr__rule" aria-hidden="true" />
            <p className="lbr__eyebrow">Lebensräume</p>
            <h1 className="lbr__title">
              Ihr intelligentes Haus — ausgestattet mit smarter Gebäudetechnik
            </h1>
            <p className="lbr__lead">
              Unser Showroom „Lebensräume“ im VEITH Kompetenzzentrum zeigt, wie
              Technologie Ihr Wohnen auf eine neue Stufe heben kann. Erleben Sie
              Komfort, Effizienz und Sicherheit in ihrer elegantesten Form.
            </p>
          </div>
        </div>
      </header>

      {/* ---------------------------------------- what the flat contains */}
      <section className="lbr__areas section on-night" aria-labelledby="lbr-bereiche">
        <div className="container-wide">
          <div className="lbr__areas-grid">
            <div className="lbr__areas-intro">
              <span className="lbr__rule" aria-hidden="true" />
              <h2 className="lbr__h2" id="lbr-bereiche">
                Als Wohnung aufgebaut
              </h2>
              <p className="lbr__areas-lead">
                Kein Musterkoffer und kein Prospekt: Sie gehen durch Räume, in
                denen die Technik so sitzt, wie sie bei Ihnen sitzen würde. Fünf
                Themen finden Sie darin.
              </p>

              <figure className="lbr__areas-media">
                <Image
                  src="lebensraeume-detail"
                  alt="Detail im Showroom Lebensräume: Bedienstelle für Licht und Beschattung an der Wand"
                  ratio="3 / 4"
                  sizes="(min-width: 62rem) 24rem, 100vw"
                />
              </figure>
            </div>

            <ol className="lbr__area-list">
              {areas.map((a, i) => (
                <Reveal as="li" key={a.id} className="lbr__area" delay={i * 50}>
                  <span className="lbr__area-no" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="lbr__area-body">
                    <h3 className="lbr__area-title">{a.title}</h3>
                    <p className="lbr__area-text">{a.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- how to visit */}
      <section className="lbr__visit section" aria-labelledby="lbr-besuch">
        <div className="container-wide">
          <div className="lbr__visit-grid">
            <Reveal className="lbr__visit-text">
              <span className="lbr__rule" aria-hidden="true" />
              <h2 className="lbr__h2" id="lbr-besuch">
                Ansehen, anfassen, ausprobieren
              </h2>
              <p>
                Vieles an Gebäudetechnik lässt sich schwer beschreiben und leicht
                zeigen. Kommen Sie vorbei und bedienen Sie sie selbst — wir gehen
                mit Ihnen durch und beantworten, was sich dabei ergibt.
              </p>
              <p className="lbr__visit-hours">
                {company.appointmentNote}. Sie finden uns in{' '}
                {company.address.street}, {company.address.postalCode}{' '}
                {company.address.city}.
              </p>
              <div className="lbr__visit-actions">
                <Button href={`tel:${company.phone.href}`} arrow>
                  Termin vereinbaren
                </Button>
                <Button to="/kontakt" variant="ghost" arrow>
                  Anfahrt und Ansprechpartner
                </Button>
              </div>
            </Reveal>

            <Reveal className="lbr__visit-side" delay={80}>
              <p className="lbr__visit-sidelabel">Showroom</p>
              <p className="lbr__visit-address">
                VEITH Kompetenzzentrum
                <br />
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </p>
              <a className="lbr__visit-phone" href={`tel:${company.phone.href}`}>
                {company.phone.display}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
