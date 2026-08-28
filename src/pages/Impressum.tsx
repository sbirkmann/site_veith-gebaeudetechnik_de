import { useSeo } from '../hooks/useSeo'
import { company, imageCredits } from '../data/company'
import { webPageJsonLd } from '../seo/schema'
import './Legal.scss'

/** Top-level sections, in document order. Drives both the TOC and the anchors. */
const sections = [
  { id: 'herausgeber', label: 'Herausgeber' },
  { id: 'haftungsausschluss', label: 'Haftungsausschluss (Disclaimer)' },
  { id: 'umsetzung', label: 'Konzept, Realisation und Bildquellen' },
]

export default function Impressum() {
  useSeo({
    title: 'Impressum',
    description:
      'Impressum der Veith Gebäudetechnik GmbH, Bußmatten 15, 77815 Bühl/Baden: Herausgeber, Geschäftsführer, Registereintrag, USt-IdNr. und Haftungsausschluss.',
    path: '/impressum',
    jsonLd: webPageJsonLd({
      path: '/impressum',
      name: 'Impressum',
      description:
        'Impressum der Veith Gebäudetechnik GmbH, Bußmatten 15, 77815 Bühl/Baden: Herausgeber, Geschäftsführer, Registereintrag, USt-IdNr. und Haftungsausschluss.',
      crumbs: [
        { name: 'Startseite', path: '/' },
        { name: 'Impressum', path: '/impressum' },
      ],
    }),
  })

  const { address, register } = company

  return (
    <div className="legal">
      <div className="container">
        <header>
          <span className="legal__rule" aria-hidden="true" />
          <p className="legal__eyebrow">Rechtliches</p>
          <h1 className="legal__title">Impressum</h1>
          <p className="legal__lead">
            Angaben gemäß § 5 TMG sowie die Hinweise zur Haftung und zum
            Urheberrecht für diese Website.
          </p>
        </header>

        <div className="legal__grid">
          {/* ------------------------------------------------------- contents */}
          <nav className="legal__toc" aria-label="Inhalt dieser Seite">
            <p className="legal__toc-title" id="impressum-toc">
              Inhalt
            </p>
            <ol aria-labelledby="impressum-toc">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          {/* ---------------------------------------------------------- body */}
          <div className="legal__body">
            {/* --------------------------------------------- Herausgeber */}
            <section className="legal__section" aria-labelledby="herausgeber">
              <h2 id="herausgeber">Herausgeber</h2>

              <address className="legal__facts">
                {company.legalName}
                <br />
                {address.street}
                <br />
                {address.postalCode} {address.city}
                <br />
                Telefon: {company.phone.display}
                <br />
                Telefax: {company.fax.display}
                <br />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </address>

              <dl className="legal__dl">
                <div>
                  <dt>Vertretungsberechtigter Geschäftsführer</dt>
                  <dd>{company.managingDirector}</dd>
                </div>
                <div>
                  <dt>Registergericht</dt>
                  <dd>{register.court}</dd>
                </div>
                <div>
                  <dt>Registernummer</dt>
                  <dd>{register.number}</dd>
                </div>
                <div>
                  <dt>USt-IdNr. gemäß § 27 a Umsatzsteuergesetz</dt>
                  <dd>{company.vatId}</dd>
                </div>
              </dl>
            </section>

            {/* ---------------------------------------------- Disclaimer */}
            <section
              className="legal__section"
              aria-labelledby="haftungsausschluss"
            >
              <h2 id="haftungsausschluss">Haftungsausschluss (Disclaimer)</h2>

              <h3>Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen oder nach
                Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
                Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
                hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
                ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
                werden wir diese Inhalte umgehend entfernen.
              </p>

              <h3>Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
                überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar. Eine permanente inhaltliche
                Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige Links
                umgehend entfernen.
              </p>

              <h3>Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten,
                nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
                dieser Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
                Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
                werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>

            {/* ------------------------------------------ Umsetzung / Bilder */}
            <section className="legal__section" aria-labelledby="umsetzung">
              <h2 id="umsetzung">Konzept, Realisation und Bildquellen</h2>

              <h3>Konzept und Realisation</h3>
              <p>publiq · Büro für Gestaltung</p>

              <h3>Technische Umsetzung</h3>
              <p>Kodeo Internetagentur</p>

              <h3>Bildquellen</h3>
              <ul className="legal__credits">
                {imageCredits.map((credit) => (
                  <li key={credit}>{credit}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
